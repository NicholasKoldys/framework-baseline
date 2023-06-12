import { Workbox } from 'workbox-window';
import pushToast from './toastWindow';
import alertForUpdate from './alertPromptWindow';

if ('serviceWorker' in navigator) {
    const wb = new Workbox('/sw.js');

    const showSkipWaitingPrompt = async () => {
        // if accepted service worker will take control.
        wb.addEventListener('controlling', () => {
            // reloading will ensure that the current tab is loaded under the control of the new service worker.
            //  auto-save or persist transient state before triggering the reload.
            window.location.reload();
            //TODO window reload via user consent
        });

        // When `event.wasWaitingBeforeRegister` is true,updated service worker is still waiting.
        const { isConfirmed, isCanceled } = alertForUpdate("reload", "HelloAlert", () => {
            // TODO
        });

        isConfirmed.then( () => {
            wb.messageSW({type: "SKIP_WAITING"});
            pushToast("Updated", "Service Worker Updated", () => {});
        });

        isCanceled.then(() => {
            pushToast("Cancelled", "Service Worker Update Cancelled", () => {});
        });
    };

    // Add an event listener to detect when the registered
    // service worker has installed but is waiting to activate.
    wb.addEventListener('waiting', async (event) => {
        if( event.isUpdate ) {
            const swVersion = await wb.messageSW({type: 'GET_VERSION'});
            pushToast(`Service Worker: ${event.target}`, `Service Worker Available: ${swVersion}`, () => {});
        }
        showSkipWaitingPrompt();
    });

    // Fired Every page load
    wb.register().then( async (registration) => {

        // * This is the first SW on this page.
        if(registration.installing) {
            const swVersion = await wb.messageSW({type: 'GET_VERSION'});

            pushToast(`Service Worker Version scoped: ${registration.scope}`, `Service Worker Version: ${swVersion} - Ready for Offline`, () => {});
        }
    });
}