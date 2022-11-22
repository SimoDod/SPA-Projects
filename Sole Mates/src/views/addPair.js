import { html } from "../../node_modules/lit-html/lit-html.js";
import { onAddItem } from "../api/data.js";

let context = null;
export async function showAddPair(ctx) {
    context = ctx;
    ctx.render(addPairTemplate())
}

function addPairTemplate(params) {
    return html`
    <section id="create">
        <div class="form">
            <h2>Add item</h2>
            <form @submit=${addItemSubmit} class="create-form">
                <input type="text" name="brand" id="shoe-brand" placeholder="Brand" />
                <input type="text" name="model" id="shoe-model" placeholder="Model" />
                <input type="text" name="imageUrl" id="shoe-img" placeholder="Image url" />
                <input type="text" name="release" id="shoe-release" placeholder="Release date" />
                <input type="text" name="designer" id="shoe-designer" placeholder="Designer" />
                <input type="text" name="value" id="shoe-value" placeholder="Value" />
    
                <button type="submit">post</button>
            </form>
        </div>
    </section>`
}

async function addItemSubmit(e) {
    e.preventDefault()
    const form = new FormData(e.target);
    const {brand, model, imageUrl, release, designer, value} = Object.fromEntries(form);

    try {
        if(!brand || !model || !imageUrl || !release || !designer || !value) {
            throw new Error('Empty Fields');
        }

        await onAddItem({brand, model, imageUrl, release, designer, value});
        context.page.redirect('/');
    } catch (error) {
        window.alert(error)
    }
}