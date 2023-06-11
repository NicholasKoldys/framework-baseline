
function createToast(type, message, onClick) {
    const toastTemplate = global.document.getElementById("low-toast-template");
    const toast = toastTemplate.content.cloneNode(true);

    let container = toast.children["toast-container"];
    container.title = type;
    container.classList.add("show");

    //TODO Adding bubbling event where toast-notify catches and changes style.  OR find an event on adding live mutation observer.
    /* container.addEventListener("", () => {

    }) */

    container.addEventListener('click', () => {
        if(onClick) onClick();
        container.classList.remove("show");
    });

    for(let ele of container.children) {
        // if(ele.slot == "toast-icon")
        if(ele.slot == "toast-desc") {
            ele.textContent = message;
        }        
    }

    return toast;
}

export default function pushToast(type, message, onClick) {

    const notifier = global.document.getElementById("toast-notify")

    const toaster = createToast(type, message, onClick);

    notifier.appendChild(toaster);    
}