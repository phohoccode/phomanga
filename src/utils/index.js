export function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' });
}