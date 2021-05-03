import { Loader } from 'google-maps';

let googleMapsReference = null;

export async function getGoogleMaps() {
        if (googleMapsReference != null) {
            return googleMapsReference;
        }
        
        const options = {
            version: 'weekly'
        }

        const loader = new Loader(process.env.GOOGLE_MAPS_API_KEY, options);

        try {
            googleMapsReference = await loader.load();
            // const google = await loader.load();
            // googleMapsReference = google;
        } catch (e) {}

        return googleMapsReference;
}
