import { html, nothing, render } from "../../node_modules/lit-html/lit-html.js";
import { onSearch } from "../api/data.js";
import { getUserData } from "../util.js";

export async function showSearch(ctx) {
    
    ctx.render(searchTemplate())
}

function searchTemplate() {
    return html`
    <section id="search">
        <h2>Search by Brand</h2>
    
        <form @submit=${onSearchSubmit} class="search-wrapper cf">
            <input id="#search-input" type="text" name="search" placeholder="Search here..." required />
            <button type="submit">Search</button>
        </form>
    
        <h3>Results:</h3>
        <div id="search-container">
        <ul class="card-wrapper"> </ul>
        </div>
    </section>`
}

function resultTemplate(data) {
    return html`
        <li class="card">
            <img src="${data.imageUrl}" alt="travis" />
            <p>
                <strong>Brand: </strong><span class="brand">${data.brand}</span>
            </p>
            <p>
                <strong>Model: </strong><span class="model">${data.model}</span>
            </p>
            <p><strong>Value:</strong><span class="value">${data.value}</span>$</p>
            ${(getUserData()) ? html`<a class="details-btn" href="">Details</a>` : nothing}
        </li>`
}

function noResultTemplate() {
    return html`<h2>There are no results found.</h2>`;
}

async function onSearchSubmit(e) {
    e.preventDefault()
    const searchField = new FormData(e.target).get('search');
    const container = document.getElementById('search-container');
    const ul = document.getElementsByClassName('card-wrapper')[0];
    try {
        const data = await onSearch(searchField);
        
        if(data.length < 1) {
            render(noResultTemplate(), container);
        } else {
            render(html`${data.map(x => resultTemplate(x))}`, ul)
        }
    } catch (error) {
        window.alert(error)
    } 
}