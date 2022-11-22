import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getItemById, onEdit } from "../api/data.js";

let itemId = null;
let context = null;

export async function showEdit(ctx) {
    itemId = ctx.params.id;
    context = ctx;
    try {
        const data = await getItemById(itemId);
        ctx.render(editTemplate(data));
    } catch (error) {
        window.alert();
    }

}

function editTemplate(data) {
    return html`<section id="edit">
    <div class="form">
        <h2>Edit item</h2>
        <form @submit=${onEditSubmit} class="edit-form">
            <input type="text" name="brand" id="shoe-brand" placeholder="Brand" .value="${data.brand}"/>
            <input type="text" name="model" id="shoe-model" placeholder="Model" .value="${data.model}"/>
            <input type="text" name="imageUrl" id="shoe-img" placeholder="Image url" .value="${data.imageUrl}"/>
            <input type="text" name="release" id="shoe-release" placeholder="Release date" .value="${data.release}"/>
            <input type="text" name="designer" id="shoe-designer" placeholder="Designer" .value="${data.designer}"/>
            <input type="text" name="value" id="shoe-value" placeholder="Value" .value="${data.value}"/>

            <button type="submit">post</button>
        </form>
    </div>
</section>`
}

async function onEditSubmit(e) {
    e.preventDefault()
    const form = new FormData(e.target);
    const { brand, model, imageUrl, release, designer, value } = Object.fromEntries(form);

    try {
        if (!brand || !model || !imageUrl || !release || !designer || !value) {
            throw new Error('Empty fields');
        }
        await onEdit(itemId, { brand, model, imageUrl, release, designer, value });
        context.page.redirect('/')
    } catch (error) {
        window.alert(error)
    }
}
