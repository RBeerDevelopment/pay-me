module.exports = {
    purge: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                paypal: '#3b7bbf',
            },
        },
    },
    variants: {
        extend: {
            backgroundColor: ['active'],
        },
    },

    plugins: [require('@tailwindcss/forms')],
};
