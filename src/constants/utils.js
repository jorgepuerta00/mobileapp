import { Platform, StatusBar, Dimensions } from 'react-native';
import { theme } from 'galio-framework';

const { width, height } = Dimensions.get("screen");

export const StatusHeight = StatusBar.currentHeight;
export const HeaderHeight = theme.SIZES.BASE * 2.5;
export const thumbMeasure = (width - 48 - 32) / 7;

export const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812);

export function currencyFormat(num) {
    return '$' + parseInt(num).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

export function unitPrice(totalcost, quantity) {
    const unitPrice = totalcost / quantity;
    return currencyFormat(unitPrice)
}

export function validateEmail(email) {
    const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return expression.test(String(email).toLocaleLowerCase())
}

export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const isIOS = Platform.OS === 'ios' ? true : false

export function getCryptoCode() {
    var u = '', i = 0;
    while (i++ < 16) {
        var c = 'xxxxxxxxxxxxxxxx'[i - 1], r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        u += (c == '-' || c == '4') ? c : v.toString(16)
    }
    return u;
}

export const removeNonNumber = (string = "") => string.replace(/[^\d]/g, "");
export const removeLeadingSpaces = (string = "") => string.replace(/^\s+/g, "");

export const expiryFormat = (string) => {
    if (string === "") {
        return "";
    } else {
        var expiry = string.toString();
        const expiryMaxLength = 5;

        if (expiry.match(/\//))
            expiry = expiry.replace("/", "");

        if (expiry.length > 2)
            expiry = expiry.slice(0, 2) + "/" + expiry.slice(2, expiryMaxLength);
    }

    return expiry;
}