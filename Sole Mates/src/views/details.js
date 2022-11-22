import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getItemById, onDelete } from "../api/data.js";
import { getUserData } from "../util.js";

let itemId = null;

let context = null;

export async function showDetails(ctx) {
    itemId = ctx.params.id;
    context = ctx;
    const data = await getItemById(itemId);
    ctx.render(detailsTemplate(data))
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

function detailsTemplate(data) {
    return html`
    <section id="details">
        <div id="details-wrapper">
            <p id="details-title">Shoe Details</p>
            <div id="img-wrapper">
                <img src="${data.imageUrl}" alt="example1" />
            </div>
            <div id="info-wrapper">
                <p>Brand: <span id="details-brand">${data.brand}</span></p>
                <p>
                    Model: <span id="details-model">${data.model}</span>
                </p>
                <p>Release date: <span id="details-release">${data.release}</span></p>
                <p>Designer: <span id="details-designer">${data.designer}</span></p>
                <p>Value: <span id="details-value">${data.value}</span></p>
            </div>
    
            <!--Edit and Delete are only for creator-->
            ${(getUserData() && data._ownerId == getUserData()._id) ? ifCreatorOfElement() : nothing}
        </div>
    </section>`
}

function ifCreatorOfElement() {
    return html`
    <div id="action-buttons">
        <a href="/edit/${itemId}" id="edit-btn">Edit</a>
        <a href="javascript:void(0)" @click=${deleteBtnFunc} id="delete-btn">Delete</a>
    </div>`
}

async function deleteBtnFunc() {
    
    try {
        const result = confirm('delete item ?');
        if(!result) return;
        await onDelete(itemId);
        context.page.redirect('/');
    } catch (error) {
        window.alert(error)
    }
}

/* <section id="details">
          <div id="details-wrapper">
            <p id="details-title">Shoe Details</p>
            <div id="img-wrapper">
              <img src="./images/travis.jpg" alt="example1" />
            </div>
            <div id="info-wrapper">
              <p>Brand: <span id="details-brand">Air Jordan</span></p>
              <p>
                Model: <span id="details-model">1 Retro High TRAVIS SCOTT</span>
              </p>
              <p>Release date: <span id="details-release">2019</span></p>
              <p>Designer: <span id="details-designer">Travis Scott</span></p>
              <p>Value: <span id="details-value">2000</span></p>
            </div>

            <!--Edit and Delete are only for creator-->
            <div id="action-buttons">
              <a href="" id="edit-btn">Edit</a>
              <a href="" id="delete-btn">Delete</a>
            </div>
          </div>
        </section> */