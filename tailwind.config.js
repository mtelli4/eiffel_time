/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#2E3494',
                secondary: '#D9D9D9',
                background: '#ECF0F1',
            },
        },
    },
    plugins: [],
}
