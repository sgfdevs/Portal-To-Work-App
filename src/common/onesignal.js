import { Platform } from 'quasar';
import { loadScript } from './helpers';

export async function setup() {

    let userID = null;

    if (window === undefined) return;

    if (Platform.is.cordova || Platform.is.capacitor || window.location.hostname !== process.env.PRODUCTION_DOMAIN) {
        return;
    }

    try {
        await loadScript('https://cdn.onesignal.com/sdks/OneSignalSDK.js');
    } catch (e) {}

    try {
        userID = await getOneSignalUserId();
    } catch (e) {}

    return userID;
}

function getOneSignalUserId() {
    return new Promise((resolve, reject) => {
        window.OneSignal = window.OneSignal || [];

        OneSignal.push(() => {
            OneSignal.init({
                appId: process.env.ONESIGNAL_APP_ID,
            });

            OneSignal.on('subscriptionChange',() => {
                OneSignal.push(() => {
                    OneSignal.getUserId().then((userId) => {
                        resolve(userId);
                    });
                });
            });
        });
    });
}
