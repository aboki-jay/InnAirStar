/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                display: ['ProximaCondensed', 'sans-serif'],
                mono: ['RedditMono', 'monospace'],
                script: ['ComedikScript', 'cursive'],
                helvetica: ['HelveticaNow', 'sans-serif'],
            },
        },
    },
    plugins: [],
}