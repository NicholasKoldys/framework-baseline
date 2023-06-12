import "../public/style/alert.css";
import "../public/style/style.css";
import "../public/style/toast.css";
import "../public/style/spinner.css";
import { getUsers, deleteUser } from './api/users/userApi.mjs';

function createUserRow(trTemplate, userObj) {

    const clonedUserRow = trTemplate.content.cloneNode(true);
    const trElement = clonedUserRow.children.namedItem("user");

    for(const [attrib, val] of Object.entries(userObj)) {
        for(const tr of trElement.children) {
            if (tr.slot == attrib) {
                tr.textContent = val;
            }
            if (tr.slot == "data-id" && attrib == "id") {
                tr.firstChild.setAttribute("data-id", val);
            }
        }
    }

    return clonedUserRow;
}

getUsers().then(result => {

    const userTemplate = global.document.getElementById("user-data-template");
    const users = global.document.getElementById('users');

    result.forEach(user => {
        const userRow = createUserRow(userTemplate, user);
        users.append(userRow);
    });

    const deleteLinks = global.document.getElementsByClassName('delete-user');

    for(const link of deleteLinks) {
        link.onclick = function(event) {
            const element = event.target;
            event.preventDefault();
            deleteUser(element.attributes["data-id"].value);
            const row = element.parentNode.parentNode;
            row.parentNode.removeChild(row);
        }
    }
});