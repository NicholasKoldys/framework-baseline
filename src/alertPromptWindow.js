function createAlert(type, message, onClick, onCancel) {
    const alertTemplate = global.document.getElementById("high-alert-template");
    const alert = alertTemplate.content.cloneNode(true);
    
    let container = alert.children["alert-container"];
    container.title = type;
    container.classList.add("show");

    //TODO Adding bubbling event where toast-notify catches and changes style.  OR find an event on adding live mutation observer.
    /* container.addEventListener("", () => {

    }) */

    var resolver, canceler;

    for(let ele of container.children) {
        if(ele.slot == "alert-desc") {
            ele.textContent = message;
        }
        if(ele.slot == "alert-action" && onClick) {
            resolver = new Promise((resolve) => {
                ele.addEventListener('click', () => {
                    resolve(true);
                    container.classList.remove("show");
                }, {once: true} );
            });
        }
        if(ele.slot == "alert-cancel" && onCancel) {
            canceler = new Promise((resolve) => {
                ele.addEventListener('click', () => {
                    resolve(false);
                    container.classList.remove("show");
                }, {once: true} );
            });
        }
    }

    return { "alert": alert, "resolve": resolver, "cancel": canceler };
}

export default function alertForUpdate(type, message, onClick, onCancel) {
    const notifier = global.document.getElementById("alert-notify")

    const { alerter, isResolved, isCanceled } = createAlert(type, message, onClick, onCancel);

    notifier.appendChild(alerter);

    return { isResolved, isCanceled }
}