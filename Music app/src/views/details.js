import { html } from "../../node_modules/lit-html/lit-html.js"
import { getItemById, onDelete } from "../api/data.js";

let context = null;
let id = null;

export async function showDetailsView(ctx) {
    id = ctx.params.id
    
    try {
        const data = await getItemById(id);
        ctx.render(detailsTemplate(data))
    } catch (error) {
        window.alert(error)
    }
    context = ctx;
}

function detailsTemplate(data) {
    let userData = JSON.parse(sessionStorage.getItem('user'));
    if(userData === null) {
        userData = {
            _id: ''
        }
    }
        
    return html`
    <section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src="${data.imgUrl}">
        </div>
        <div class="albumInfo">
            <div class="albumText">

                <h1>Name: ${data.name}</h1>
                <h3>Artist: ${data.artist}</h3>
                <h4>Genre: ${data.genre}</h4>
                <h4>Price: ${data.price}</h4>
                <h4>Date: ${data.releaseDate}</h4>
                <p>Description: ${data.description}</p>
            </div>

            <!-- Only for registered user and creator of the album-->
            
            ${(userData._id == data._ownerId) ? buttonsTemplate() : ''}
        </div>
    </div>
</section>
`}

function buttonsTemplate() {
    return html`<div class="actionBtn">
    <a href="/edit/${id}" class="edit">Edit</a>
    <a href="javascript:void(0)" @click="${removeFunc}" class="remove">Delete</a>
</div>`
}

async function removeFunc() {
    try {
        await onDelete(id);
        context.page.redirect('/');
        window.alert('Item Deleted')
    } catch (error) {
        window.alert(error)
    }
}