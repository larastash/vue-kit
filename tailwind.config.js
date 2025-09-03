import defaultTheme from 'tailwindcss/defaultTheme';
import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './**/*.blade.php',
        './**/*.js',
        './**/*.vue',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                serif: [...defaultTheme.fontFamily.serif],
                mono: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
            },
            colors: {
                primary: colors.yellow,
                info: colors.blue,
                success: colors.green,
                danger: colors.red,
                // white: '#F2F0EF',
                black: '#121212',
                gray: colors.neutral,
            },
            borderRadius: {
                brand: defaultTheme.borderRadius.lg,
            },
        },
    },
    plugins: [
        //
    ],
}