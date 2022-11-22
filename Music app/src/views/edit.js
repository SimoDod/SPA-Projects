import { html } from "../../node_modules/lit-html/lit-html.js";
import { getItemById, onEdit } from "../api/data.js";

let id = null;
let context = null;

export async function showEditPage(ctx) {
    id = ctx.params.id;
    context = ctx;
    const data = await getItemById(id);
    ctx.render(editTemplate(data));
}

function editTemplate(data) {
   return html` 
    <section class="editPage">
    <form @submit="${onSubmitE}">
        <fieldset>
            <legend>Edit Album</legend>

            <div class="container">
                <label for="name" class="vhide">Album name</label>
                <input id="name" name="name" class="name" type="text" .value="${data.name}">

                <label for="imgUrl" class="vhide">Image Url</label>
                <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" .value="${data.imgUrl}">

                <label for="price" class="vhide">Price</label>
                <input id="price" name="price" class="price" type="text" .value="${data.price}">

                <label for="releaseDate" class="vhide">Release date</label>
                <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" .value="${data.releaseDate}">

                <label for="artist" class="vhide">Artist</label>
                <input id="artist" name="artist" class="artist" type="text" .value="${data.artist}">

                <label for="genre" class="vhide">Genre</label>
                <input id="genre" name="genre" class="genre" type="text" .value="${data.genre}">

                <label for="description" class="vhide">Description</label>
                <textarea name="description" class="description" rows="10"
                    cols="10">${data.description}</textarea>

                <button class="edit-album" type="submit">Edit Album</button>
            </div>
        </fieldset>
    </form>
</section>`
}

async function onSubmitE(e) {
    e.preventDefault()
    const form = new FormData(e.target);
    const {name, imgUrl, price, releaseDate, artist, genre, description} = Object.fromEntries(form);
    
    try {
        if(!name || !imgUrl || !price || !releaseDate || !artist || !genre || !description) {
            throw new Error('missing fields')
        }
        
        await onEdit(id, {name, imgUrl, price, releaseDate, artist, genre, description});
        context.page.redirect('/');
    } catch (error) {
        window.alert(error)
    }
}