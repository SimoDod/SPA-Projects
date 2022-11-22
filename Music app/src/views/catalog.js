import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllItems } from "../api/data.js";
import { getUserData } from "../util.js";

export async function showCatalogView(ctx) {
    try {
        const data = await getAllItems();
        ctx.render(catalogTemplate(data));
    } catch (error) {
        window.alert(error)
    } 
}

function catalogTemplate(data) {
    return html`<section id="catalogPage">
    <h1>All Albums</h1>
    ${data.map(x => catalogCard(x))}
    <!--No albums in catalog-->
    ${(data.length < 1) ? html`<p>No Albums in Catalog!</p>` : ''}
</section>`
}

function catalogCard(data) {
    return html`
    <div class="card-box">
        <img src="${data.imgUrl}">
        <div>
            <div class="text-center">
                <p class="name">Name: ${data.name}</p>
                <p class="artist">Artist: ${data.artist}</p>
                <p class="genre">Genre: ${data.genre}</p>
                <p class="price">Price: ${data.price}</p>
                <p class="date">Release Date: ${data.releaseDate}</p>
            </div>
            
            ${(getUserData()) ? html`
            <div class="btn-group">
                <a href="/details/${data._id}" data-id="${data._ownerId}" id="details">Details</a>
            </div> ` :
            ''
            }
            
        </div>
    </div>`
}