export const isLogin = () => {
    if (localStorage.getItem('user')) {
        return true;
    }

    return false;
}
export const isHR = () => {
    if (localStorage.getItem('user')==="HR") {
        return true;
    }

    return false;
}