import { html } from "../../node_modules/lit-html/lit-html.js"
import { onLogin } from "../api/data.js";
import { setUserData } from "../util.js";

let context = null;
export async function showLogin(ctx) {
    context = ctx;
    ctx.render(loginTemplate());
}

function loginTemplate() {
    return html`
    <section id="login">
      <div class="form">
        <h2>Login</h2>
        <form @submit=${onLoginSubmit} class="login-form">
          <input type="text" name="email" id="email" placeholder="email" />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
          />
          <button type="submit">login</button>
          <p class="message">
            Not registered? <a href="/register">Create an account</a>
          </p>
        </form>
      </div>
    </section>`
}


async function onLoginSubmit(e) {
    e.preventDefault()
    const form = new FormData(e.target);
    const {email, password} = Object.fromEntries(form);

    try {
        if(!email || !password) throw new Error('Empty fields');
        const data = await onLogin({email, password});
        setUserData(data);
        context.updateNav();
        context.page.redirect('/');
    } catch (error) {
        window.alert(error)
    }
}



