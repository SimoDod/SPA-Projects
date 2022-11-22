import { html } from "../../node_modules/lit-html/lit-html.js";
import { onLogin } from "../api/data.js";
import { setUserData } from "../util.js";

let context = null;

export async function showLoginView(ctx) {
    ctx.render(loginTemplate());
    context = ctx;
}

function loginTemplate() {
    return html`<section id="loginPage">
    <form @submit="${loginF}">
        <fieldset>
            <legend>Login</legend>

            <label for="email" class="vhide">Email</label>
            <input id="email" class="email" name="email" type="text" placeholder="Email">

            <label for="password" class="vhide">Password</label>
            <input id="password" class="password" name="password" type="password" placeholder="Password">

            <button type="submit" class="login">Login</button>

            <p class="field">
                <span>If you don't have profile click <a href="/register">here</a></span>
            </p>
        </fieldset>
    </form>
</section>`
}

async function loginF(e) {
    e.preventDefault();

    const form = new FormData(e.target);
    const email = form.get('email');
    const password = form.get('password');


   try {
    if(!email || !password) throw new Error('Empty Fields');

    let userData = await onLogin({email, password});
    setUserData(userData);
    context.updateNav();
    context.page.redirect('/');
   } catch (error) {
    window.alert(error);
   } 
}