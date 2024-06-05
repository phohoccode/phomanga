export default {
    get(key, type) {
        return JSON.parse(localStorage.getItem(key)) || type
    },
    set(key, data) {
        return localStorage.setItem(key, JSON.stringify(data))
    }
}

export function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' });
}
