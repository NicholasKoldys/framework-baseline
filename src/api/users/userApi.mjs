import getBaseUrl from '../../util/baseUrl.mjs';

const BaseUrl = getBaseUrl();

export function getUsers() {
    return getReq('users');
}

export function deleteUser(id) {
    return deleteReq(`users/${id}`)
}

function getReq(url) {
    return fetch(BaseUrl + url).then(onSuccess, onError);
}

function deleteReq(url) {
    const request = new Request(BaseUrl + url, {
        method: 'DELETE'
    });

    return fetch(request).then(onSuccess, onError);
}

function onSuccess(response) {
    return response.json();
}

function onError(error) {
    // TODO
    // eslint-disable-next-line no-console
    console.log(error);
}