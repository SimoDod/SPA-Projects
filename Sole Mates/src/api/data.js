import { del, get, post, put } from './api.js';

const endpoints = {
    'login': 'users/login',
    'logout' : 'users/logout',
    'getItems': 'data/shoes?sortBy=_createdOn%20desc',
    'getItemById': 'data/shoes/',
    'delete': 'data/shoes/',
    'change': 'data/shoes/',
    'register': 'users/register',
    'addItem': 'data/shoes',
    'search': 'data/shoes?where=brand%20LIKE%20%22'
}

export async function onLogin(data) {
    return await post(endpoints.login, data)
}

export async function onLogout() {
    return await get(endpoints.logout)
}

export async function getItems() {
    return await get(endpoints.getItems)
}

export async function getItemById(id) {
    return await get(endpoints.getItemById + id);
}

export async function onDelete(id) {
    return await del(endpoints.delete + id);
}

export async function onEdit(id, data) {
    return await put(endpoints.change + id, data);
}

export async function onRegister(data) {
    return await post(endpoints.register, data)
}

export async function onAddItem(data) {
    return await post(endpoints.addItem, data)
}

export async function onSearch(query) {
    return await get(endpoints.search + query + '%22')
}