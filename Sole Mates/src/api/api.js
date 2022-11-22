const host = 'http://localhost:3030/'

async function serviceHandler(method, url, data) {
   
    let options = {
        method: method,
        headers: {}
    }

    if(data !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const user = JSON.parse(sessionStorage.getItem('user'));
    
    if(user) {
        options.headers['X-Authorization'] = user.accessToken;
    }
    
    try {
        const response = await fetch(host + url, options)
        
        if(response.ok !== true) {
            const error = await response.json()
            throw new Error(error.message);
        }
        
        if(response.status == 204) {
            return response;
        } else {
            return response.json()
        }
        
    } catch (error) {
        window.alert(error);
        throw error;
    } 
}

export const get = serviceHandler.bind(null, 'get');
export const post = serviceHandler.bind(null, 'post');
export const put = serviceHandler.bind(null, 'put');
export const del = serviceHandler.bind(null, 'delete');