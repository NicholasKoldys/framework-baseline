function createAlert(type, message, onClick, onCancel) {
    const alertTemplate = global.document.getElementById("high-alert-template");
    const alert = alertTemplate.content.cloneNode(true);
    
    let container = alert.children["alert-container"];
    container.title = type;
    container.classList.add("show");

    //TODO Adding bubbling event where toast-notify catches and changes style.  OR find an event on adding live mutation observer.
    /* container.addEventListener("", () => {

    }) */

    for(let ele of container.children) {
        if(ele.slot == "alert-desc") {
            ele.textContent = message;
        }
        if(ele.slot == "alert-action") {
            var isConfirmed = new Promise((resolve) => {
                ele.addEventListener('click', () => {
                    resolve(true);
                    if(onClick) onClick();
                    container.classList.remove("show");
                }, {once: true})
            });
        }
        if(ele.slot == "alert-cancel") {
            var isCanceled = new Promise((resolve) => {
                ele.addEventListener('click', () => {
                    resolve(false);
                    if(onCancel) onCancel();
                    container.classList.remove("show");
                }, {once: true});
            });
        }
    }

    return { alert, isConfirmed, isCanceled };
}

export default function alertForUpdate(type, message, onClick, onCancel) {
    const notifier = global.document.getElementById("alert-notify")

    var { alert, isConfirmed, isCanceled } = createAlert(type, message, onClick, onCancel);

    notifier.appendChild(alert);
    // console.log(alerter, isResolved, isCanceled);

    // return { isResolved, isCanceled }
    return { isConfirmed, isCanceled };
}