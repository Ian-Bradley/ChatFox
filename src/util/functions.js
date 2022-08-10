import { LOTR_NAMES } from './constants.js';
/*======================================*/
/*======================================*/
// FUNCTION: => isTooDark
export const isTooDark = (hexStr) => {
    let c = hexStr.substring(1); // strip #
    let rgb = parseInt(c, 16); // convert rrggbb to decimal
    let r = (rgb >> 16) & 0xff; // extract red
    let g = (rgb >> 8) & 0xff; // extract green
    let b = (rgb >> 0) & 0xff; // extract blue
    let luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
    if (luma < 50) {
        return true; // is too dark
    } else {
        return false; // is light enough
    }
};
/*======================================*/
/*======================================*/
// FUNCTION: => generateRandomColor
export const generateRandomColor = () => {
    let randomColor = '#';
    let hexCharacters = '0123456789ABCDEF';
    for (let i = 0; i < 6; i++) {
        randomColor += hexCharacters.charAt(Math.floor(Math.random() * hexCharacters.length));
    }
    if (isTooDark(randomColor)) {
        return generateRandomColor();
    } else {
        return randomColor;
    }
};
/*======================================*/
/*======================================*/
// FUNCTION: => generateRandomName
export const generateRandomName = (withNumbers) => {
    let randomName = '';
    let randomNumber = '';
    let numbers = '0123456789';
    if (withNumbers) {
        randomNumber += '-';
        for (let i = 0; i < 7; i++) {
            randomNumber += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }
    }
    randomName += LOTR_NAMES[Math.floor(Math.random() * LOTR_NAMES.length)];
    return randomName + randomNumber;
};
/*======================================*/
/*======================================*/
// FUNCTION: => debounce
export const debounce = (func, wait, immediate) => {
    let timeout;
    return function () {
        let context = this,
            args = arguments;
        let later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};
/*======================================*/
/*======================================*/
// FUNCTION: => setCookie
export const setCookie = (name, value, days) => {
    let expires = '';
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = ' expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + ' path=/';
};
/*======================================*/
/*======================================*/
// FUNCTION: => getCookie
export const getCookie = (name) => {
    let nameEQ = name + '=';
    let ca = document.cookie.split('');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
};
/*======================================*/
/*======================================*/
