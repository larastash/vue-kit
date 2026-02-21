/**
 * Русская плюрализация.
 *
 * @param {number} n — число.
 * @param {[string, string, string]} forms — [один, два, много].
 * @param {boolean} [includeNumber=true] — подставить число перед словом.
 * @returns {string}
 *
 * @example plural(1, ['яблоко', 'яблока', 'яблок']); // "1 яблоко"
 * @example plural(5, ['яблоко', 'яблока', 'яблок']); // "5 яблок"
 * @example plural(2, ['день', 'дня', 'дней'], false); // "дня"
 */
export function plural(n, forms, includeNumber = true) {
    if (!Array.isArray(forms) || forms.length !== 3) {
        throw new Error('Forms array must contain exactly 3 elements');
    }

    const numeric = Number(n);

    if (!Number.isFinite(numeric)) {
        return includeNumber ? `${n} ${forms[2]}` : forms[2];
    }

    const absN = Math.abs(numeric);
    let word;

    if (!Number.isInteger(absN)) {
        word = forms[1];
    } else {
        const lastDigit = absN % 10;
        const lastTwoDigits = absN % 100;

        if (lastDigit === 1 && lastTwoDigits !== 11) {
            word = forms[0];
        } else if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 10 || lastTwoDigits >= 20)) {
            word = forms[1];
        } else {
            word = forms[2];
        }
    }

    return includeNumber ? `${numeric} ${word}` : word;
}

/**
 * Обрезка строки с троеточием.
 *
 * @param {string} str
 * @param {number} length
 * @param {string} [suffix='…']
 * @returns {string}
 *
 * @example truncate('Привет мир!', 7); // "Привет…"
 */
export function truncate(str, length, suffix = '…') {
    if (!str || str.length <= length) return str ?? '';
    return str.slice(0, length).trimEnd() + suffix;
}

/**
 * Форматирование числа с разделителями разрядов.
 *
 * @param {number} value
 * @param {string} [locale='ru-RU']
 * @param {Intl.NumberFormatOptions} [options={}]
 * @returns {string}
 *
 * @example formatNumber(1234567); // "1 234 567"
 * @example formatNumber(1234.5, 'ru-RU', { minimumFractionDigits: 2 }); // "1 234,50"
 */
export function formatNumber(value, locale = 'ru-RU', options = {}) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return String(value);
    return new Intl.NumberFormat(locale, options).format(numeric);
}

/**
 * Форматирование цены (денежная сумма).
 *
 * @param {number} value
 * @param {string} [currency='RUB']
 * @param {string} [locale='ru-RU']
 * @returns {string}
 *
 * @example formatCurrency(2999.9); // "2 999,90 ₽"
 */
export function formatCurrency(value, currency = 'RUB', locale = 'ru-RU') {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return String(value);
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(numeric);
}

/**
 * Форматирование даты.
 *
 * @param {string|Date} date
 * @param {Intl.DateTimeFormatOptions} [options]
 * @param {string} [locale='ru-RU']
 * @returns {string}
 *
 * @example formatDate('2026-02-20'); // "20 февр. 2026 г."
 * @example formatDate('2026-02-20', { day: 'numeric', month: 'long' }); // "20 февраля"
 */
export function formatDate(date, options = { dateStyle: 'medium' }, locale = 'ru-RU') {
    const d = date instanceof Date ? date : new Date(date);
    if (isNaN(d.getTime())) return String(date);
    return new Intl.DateTimeFormat(locale, options).format(d);
}

/**
 * Копирование текста в буфер обмена.
 *
 * @param {string} text
 * @returns {Promise<boolean>}
 */
export async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        return false;
    }
}

/**
 * Безопасный доступ к вложенным свойствам через точечную нотацию.
 *
 * @param {Object} obj
 * @param {string} path — например 'user.address.city'
 * @param {*} [defaultValue=undefined]
 * @returns {*}
 *
 * @example dataGet({ a: { b: 1 } }, 'a.b'); // 1
 * @example dataGet({}, 'a.b', 'fallback'); // "fallback"
 */
export function dataGet(obj, path, defaultValue = undefined) {
    if (!obj || !path) return defaultValue;
    const value = path.split('.').reduce((acc, part) => (acc && typeof acc === 'object' ? acc[part] : undefined), obj);
    return value !== undefined ? value : defaultValue;
}

/**
 * Генерация случайного ID (UUID v4 если поддерживается, иначе fallback).
 *
 * @returns {string}
 */
export function uid() {
    return crypto.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Ожидание N миллисекунд (для async/await цепочек).
 *
 * @param {number} ms
 * @returns {Promise<void>}
 *
 * @example await sleep(500);
 */
export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
