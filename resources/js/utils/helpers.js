/**
 * Returns the correct Russian plural form for a word based on the given number.
 *
 * Russian pluralization rules handled:
 * - Form 0: nominative singular (1, 21, 31... but not 11)
 * - Form 1: genitive singular (2–4, 22–24... but not 12–14)
 * - Form 2: genitive plural (0, 5–20, 25–30...)
 *
 * Notes:
 * - Negative numbers are supported (the absolute value is used to pick the form).
 * - Fractional numbers (e.g., 1.5) use Form 1 (genitive singular) in this helper.
 *
 * @param {number} n The number used to determine the plural form.
 * @param {string[]} forms Array of word forms:
 *   [nominativeSingular, genitiveSingular, genitivePlural]
 * @param {boolean} [includeNumber=true] Whether to prepend the number to the result.
 * @returns {string} Formatted string with the correct plural form.
 *
 * @example plural(1, ['яблоко', 'яблока', 'яблок']); // "1 яблоко"
 * @example plural(5, ['яблоко', 'яблока', 'яблок']); // "5 яблок"
 * @example plural(2, ['день', 'дня', 'дней'], false); // "дня"
 * @example plural(0, ['товар', 'товара', 'товаров']); // "0 товаров"
 * @example plural(1.5, ['яблоко', 'яблока', 'яблок']); // "1.5 яблока"
 */

export function plural(n, forms, includeNumber = true) {
  if (!Array.isArray(forms) || forms.length !== 3) {
    throw new Error('Forms array must contain exactly 3 elements');
  }

  const absN = Math.abs(n);
  let word;

  if (!Number.isInteger(absN)) {
    word = forms[1];
  } else {
    const lastDigit = absN % 10;
    const lastTwoDigits = absN % 100;

    if (lastDigit === 1 && lastTwoDigits !== 11) {
      word = forms[0];
    } else if (
      lastDigit >= 2 &&
      lastDigit <= 4 &&
      (lastTwoDigits < 10 || lastTwoDigits >= 20)
    ) {
      word = forms[1];
    } else {
      word = forms[2];
    }
  }

  return includeNumber ? `${n} ${word}` : word;
}
