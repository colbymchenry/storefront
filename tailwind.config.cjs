let colors = ['slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'];
let colorLevels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
let heightValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96];
let classes = [];

colors.forEach((color) => {
    colorLevels.forEach((level) => {
        classes.push('text' + '-' + color + '-' + level);
        classes.push('bg' + '-' + color + '-' + level);
        classes.push('hover:text' + '-' + color + '-' + level);
        classes.push('hover:bg' + '-' + color + '-' + level);
        classes.push('shadow' + '-' + color + '-' + level);
        classes.push('border' + '-' + color + '-' + level);
        classes.push('outline' + '-' + color + '-' + level);
    })
})

heightValues.forEach((height) => {
    classes.push('h-' + height);
    classes.push('min-h-' + height);
    classes.push('max-h-' + height);
    classes.push('w-' + height);
    classes.push('min-w-' + height);
    classes.push('max-w-' + height);
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
