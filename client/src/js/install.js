const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    console.log('beforeinstallprompt event triggered');
    // Store the triggered events
    window.deferredPrompt = event;

    // Remove the hidden class from the button
    butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    console.log('Install button clicked');
    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
        return;
    }

    // show prompt
    promptEvent.prompt();

    // reset the deferred prompt variable, it can only be used once
    window.deferredPrompt = null;

    butInstall.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('PWA was installed');
    // clear prompt
    window.deferredPrompt = null;
});
