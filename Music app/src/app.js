import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';
import { showCatalogView } from './views/catalog.js';
import { showHomeView } from './views/home.js';
import { showSearchView } from './views/search.js';
import { showRegisterView } from './views/register.js';
import { showCreateAlbumView } from './views/createAlbum.js';
import { clearUserData, getUserData } from './util.js';
import { showLoginView } from './views/login.js';
import { onLogout } from './api/data.js';
import { showDetailsView } from './views/details.js';
import { showEditPage } from './views/edit.js';

const root = document.getElementById('main-content');

let context = null;
function showView(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateNav = updateNav;
    context = ctx;
    next();
}

updateNav();

page(showView);
page('index.html', '/');
page('/', showHomeView);
page('/catalog', showCatalogView);
page('/details/:id', showDetailsView);
page('/edit/:id', showEditPage);
page('/search', showSearchView);
page('/login', showLoginView);
page('/register', showRegisterView);
page('/createAlbum', showCreateAlbumView);
page.start();

const logout = document.querySelector('a[href="javascript:void(0)"]').addEventListener('click', async () => {
    try {
        await onLogout();
        clearUserData();
        updateNav();
        context.page.redirect('/');
    } catch (error) {
        window.alert(error)
    }
});

function updateNav() {
    if (getUserData()) {
        [...document.getElementsByClassName('guest')].map(b => b.style.display = 'none');
        [...document.getElementsByClassName('user')].map(b => b.style.display = 'inline');
        
    } else {
        [...document.getElementsByClassName('guest')].map(b => b.style.display = 'inline');
        [...document.getElementsByClassName('user')].map(b => b.style.display = 'none');
    }
}
