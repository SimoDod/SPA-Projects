import { del, get, post, put } from "./api.js"

const endpoints = {
    'register': 'users/register',
    'login': 'users/login',
    'logout': 'users/logout',
    'catalog': 'data/albums?sortBy=_createdOn%20desc&distinct=name',
    'getById': 'data/albums/',
    'delete' : 'data/albums/',
    'create' : 'data/albums',
    'edit': 'data/albums/',
    'search' : 'data/albums?where=name%20LIKE%20%22'
}

export async function onRegister(data) {
    return await post(endpoints.register, data);
}

export async function onLogin(data) {
    return await post(endpoints.login, data);
}

export async function onLogout() {
    return await get(endpoints.logout);
}

export async function getAllItems() {
    return await get(endpoints.catalog);
}

export async function getItemById(id) {
    return await get(endpoints.getById + id)
}

export async function onDelete(id) {
    return await del(endpoints.delete + id);
}

export async function onCreate(data) {
    return await post(endpoints.create, data)
}

export async function onEdit(id, data) {
    return await put(endpoints.edit + id, data)
}

export async function search(query) {
       
    return await get(endpoints.search + query + '%22')
}