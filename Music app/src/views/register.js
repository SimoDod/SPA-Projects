
import { html } from '../../node_modules/lit-html/lit-html.js';
import { onRegister } from '../api/data.js';
import { setUserData } from '../util.js';

let context = null;

export async function showRegisterView(ctx) {
    ctx.render(registerTemplate());
    context = ctx;
}

function registerTemplate() {
    return html`<section id="registerPage">
    <form @submit="${onSubmit}">
        <fieldset>
            <legend>Register</legend>

            <label for="email" class="vhide">Email</label>
            <input id="email" class="email" name="email" type="text" placeholder="Email">

            <label for="password" class="vhide">Password</label>
            <input id="password" class="password" name="password" type="password" placeholder="Password">

            <label for="conf-pass" class="vhide">Confirm Password:</label>
            <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">

            <button type="submit" class="register">Register</button>

            <p class="field">
                <span>If you already have profile click <a href="/login">here</a></span>
            </p>
        </fieldset>
    </form>
</section>
`
}

async function onSubmit(e) {
    e.preventDefault();
   
    const form = new FormData(e.target);
    const email = form.get('email');
    const password = form.get('password');
    const rePass = form.get('conf-pass');

   try {
    if(!email || !password || !rePass) throw new Error('Empty Fields');
    if(password != rePass) throw new Error('Passwords do not match');

    let userData = await onRegister({email, password});
    setUserData(userData);
    context.updateNav();
    context.page.redirect('/');
   } catch (error) {
    window.alert(error);
   } 
}