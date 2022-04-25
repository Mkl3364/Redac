
export const setToStorage = (key: string, value: string) => {
    if(typeof window !== 'undefined') {
        return window.localStorage.setItem(key, value)
    }
}

export const getFromStorage = (key: string): string => {
    if(typeof window !== 'undefined') {
        return window.localStorage.getItem(key)!
    } else {
        return ''
    }
}

export const deleteFromStorage = (key: string) => {
    if(typeof window !== 'undefined') {
        return window.localStorage.removeItem(key)
    }
}