import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { search } from "../api/data.js";
import { getUserData } from "../util.js";

let context = null;
export async function showSearchView(ctx) {
    ctx.render(searchTemplate());
    context = ctx;
}

function searchTemplate() {
    return html`<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
        <button class="button-list" @click=${onClick}>Search</button>
    </div>

    <h2>Results:</h2>

    <div class="search-result" style="display:none;">
      
    </div>
</section>`
}

async function onClick(e) {
    let divResult = e.target.parentElement.parentElement.querySelector('div.search-result');
    divResult.style.display = 'block'
    
    const value = e.target.parentElement.children[0].value;

    try {
        if (!value) throw new Error('empty fields');
        
        const searchData = await search(value);
        if(searchData.length < 1) {
            render(ifNoMatch(), divResult)
        } else {
            render(html`${searchData.map(x => ifHasMatch(x))}`, divResult)
        }
    } catch (error) {
        window.alert(error);
    }
}

function ifNoMatch() {
    return html`<p class="no-result">No result.</p>`
}

function ifHasMatch(data) {
    return html`
    <div class="card-box">
        <img src="../..${data.imgUrl}">
        <div>
            <div class="text-center">
                <p class="name">Name: ${data.name}</p>
                <p class="artist">Artist: ${data.artist}</p>
                <p class="genre">Genre: ${data.genre}</p>
                <p class="price">Price: ${data.price}</p>
                <p class="date">Release Date: ${data.releaseDate}</p>
            </div>
            <div class="btn-group">
               ${(getUserData())? html`<a href="/details/${data._id}" id="details">Details</a>` : '' } 
            </div>
        </div>
    </div>`
}