export default function serverUrl() {
    const url = import.meta.env.VITE_SERVER_URL;

    return url ? url : '';
}