export default function getBaseUrl() {
    // TODO change all default to actual="hostname URL"
    // const inDevelopment = window.location.hostname === 'localhost';
    // return inDevelopment ? 'http://localhost:3301/' : '/';
    return getQueryStringParametersByName('useMockApi') ? 'http://localhost:3301/' : '/';
}
function getQueryStringParametersByName(name, url) {
    if (!url) url = window.location.href;

    // eslint-disable-next-line no-useless-escape
    name = name.replace("/[\[\]]/g", "\\$&");

    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    let results = regex.exec(url);

    if (!results) return null;
    if (!results[2]) return '';

    console.log(results[2]);

    return decodeURIComponent(
        results[2].replace(/\+/g, " ")
    );
}