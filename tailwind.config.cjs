let colors = ['slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'];
let colorLevels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

let classes = [];

colors.forEach((color) => {
    colorLevels.forEach((level) => {
        classes.push('text' + '-' + color + '-' + level);
        classes.push('bg' + '-' + color + '-' + level);
        classes.push('hover:text' + '-' + color + '-' + level);
        classes.push('hover:bg' + '-' + color + '-' + level);
        classes.push('shadow' + '-' + color + '-' + level);
    })
})

const config = {
    content: ["./src/**/*.{html,js,svelte,ts}"],
    theme: {
        extend: {},
    },

    safelist: [
        'text-black', 'bg-black', 'text-white', 'bg-white',
        'drop-shadow', 'drop-shadow-md', 'drop-shadow-lg', 'drop-shadow-none', 'drop-shadow-sm', 'drop-shadow-2xl', 'drop-shadow-xl',
        'shadow', 'shadow-md', 'shadow-lg', 'shadow-none', 'shadow-sm', 'shadow-2xl', 'shadow-xl', 'shadow-inner',
        'flex', 'flex-col', 'flex-row', 'flex-col-reverse', 'flex-row-reverse',
        'rounded', 'rounded-md', 'rounded-sm', 'rounded-lg', 'rounded-xl', 'rounded-2xl', 'rounded-3xl', ...classes
    ],
    plugins: [],
};

module.exports = config;
