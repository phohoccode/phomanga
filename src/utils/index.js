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

export function formatTime(time) {
    const currentTime = new Date()
    const storageTime = new Date(time)
    const diff = Math.floor((currentTime - storageTime) / 1000) 

    if (diff < 60) {
        return `Vừa xong`;
    } else if (diff < 3600) {
        return `${Math.floor(diff / 60)} phút trước`;
    } else if (diff < 86400) {
        return `${Math.floor(diff / 3600)} giờ trước`;
    } else if (diff < 86400 * 30) {
        return `${Math.floor(diff / 86400)} ngày trước`;
    } else {
        const day = storageTime.getDate();
        const month = storageTime.getMonth() + 1;
        const year = storageTime.getFullYear();
        return `${day}/${month}/${year}`;
    }    
}

// hàm này dùng để điều chỉnh con trỏ phía cuối nội dung
export function handleSelectedFocus(ref) {
    if (ref) {
        ref.focus()
        const length = ref.value.length
        ref.setSelectionRange(length, length)
    }
}

export function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

export function isUrlWithValidDomainSuffix(url) {
    const urlPattern = /^(http|https):\/\/[^\/]*\.(com|vn|org|net|edu|gov|mil|app|shop|blog|tech|online|io|co|ai|xyz)(\/.*)?$/i;
    return urlPattern.test(url)
}
