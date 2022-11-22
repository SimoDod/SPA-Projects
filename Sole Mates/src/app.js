import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';
import { showDashboard } from './views/dashboard.js';
import { showSearch } from './views/search.js';
import { showAddPair } from './views/addPair.js';
import { showLogin } from './views/login.js';
import { showRegister } from './views/register.js';
import { clearUserData, getUserData } from './util.js';
import { showHome } from './views/home.js';
import { onLogout } from './api/data.js';
import { showDetails } from './views/details.js';
import { showEdit } from './views/edit.js';

const root = document.querySelector('main')

page(middleWare)
page('index.html', '/');
page('/', showHome);
page('/dashboard', showDashboard);
page('/details/:id', showDetails);
page('/edit/:id', showEdit);
page('/search', showSearch);
page('/addPair', showAddPair);
page('/login', showLogin);
page('/register', showRegister);
page.start();

updateNav()

function middleWare(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateNav = updateNav;
    next();
}

document.querySelector('a[href="javascript:void(0)"]').addEventListener('click', async () => {
    try {
        await onLogout();
        clearUserData();
        updateNav();
        page.redirect('/');
        
    } catch (error) {
        window.alert(error)
    }
})

function updateNav() {
    if (getUserData()) {
        [...document.getElementsByClassName('guest')].map(b => b.style.display = 'none');
        [...document.getElementsByClassName('user')].map(b => b.style.display = 'inline');
        
    } else {
        [...document.getElementsByClassName('guest')].map(b => b.style.display = 'inline');
        [...document.getElementsByClassName('user')].map(b => b.style.display = 'none');
    }
}