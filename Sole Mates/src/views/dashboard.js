import { html } from "../../node_modules/lit-html/lit-html.js";
import { getItems } from "../api/data.js";


export async function showDashboard(ctx) {

    try {
        const data = await getItems();
        ctx.render(dashboardTemplate(data))
    } catch (error) {
        window.alert(error)
    }
    
}
/* _createdOn: 1617194295480
​​
_id: "136777f5-3277-42ad-b874-76d043b069cb"
​​
_ownerId: "847ec027-f659-4086-8032-5173e2f9c93a"
​​
brand: "Air Jordan"
​​
designer: "Eminem X Carhartt"
​​
imageUrl: "/images/eminem.jpg"
​​
model: "4 Retro CARHARTT X EMINEM"
​​
release: "2015"
​​
value: "30000" */

function dashboardTemplate(data) {
    return html`
    <section id="dashboard">
        <h2>Collectibles</h2>
        <ul class="card-wrapper">
            <!-- Display a li with information about every post (if any)-->
            ${(data < 1) ? html`<h2>There are no items added yet.</h2>` : data.map(x=>shoeCardTemplate(x))}
        </ul>
    
        <!-- Display an h2 if there are no posts -->
    
    </section>`
}

function shoeCardTemplate(data) {
    return html`
            <li class="card" data-id="${data._ownerId}">
                <img src=".${data.imageUrl}" alt="travis" />
                <p>
                    <strong>Brand: </strong><span class="brand">${data.brand}</span>
                </p>
                <p>
                    <strong>Model: </strong><span class="model">${data.model}</span>
                </p>
                <p><strong>Value:</strong><span class="value">${data.value}</span>$</p>
                <a class="details-btn" href="/details/${data._id}">Details</a>
            </li>`
}
