import { html } from "../../node_modules/lit-html/lit-html.js";
import { onRegister } from "../api/data.js";
import { setUserData } from "../util.js";

let context = null;
export async function showRegister(ctx) {
    context = ctx;
    ctx.render(registerTemplate())
}

function registerTemplate() {
    return html`
    <section id="register">
        <div class="form">
            <h2>Register</h2>
            <form @submit=${onRegisterSubmit} class="login-form">
                <input type="text" name="email" id="register-email" placeholder="email" />
                <input type="password" name="password" id="register-password" placeholder="password" />
                <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
                <button type="submit">login</button>
                <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
        </div>
    </section>`
}

async function onRegisterSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get('email');
    const password = form.get('password')
    const rePass = form.get('re-password')
    
    try {
        if(!email || !password || !rePass) throw new Error("empty fields");
        if(password !== rePass) throw new Error ('password do not match');
        
        const data = await onRegister({email, password});
        setUserData(data);
        context.updateNav();
        context.page.redirect('/')
    } catch (error) {
        window.alert(error)
    }
}