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

let borderRadius = [
    {
        "label": "None",
        "value": "rounded-none"
    },
    {
        "label": "Small",
        "value": "rounded-sm"
    },
    {
        "label": "Medium",
        "value": "rounded"
    },
    {
        "label": "Large",
        "value": "rounded-lg"
    },
    {
        "label": "XLarge",
        "value": "rounded-xl"
    },
    {
        "label": "XXLarge",
        "value": "rounded-2xl"
    },
    {
        "label": "XXXLarge",
        "value": "rounded-3xl"
    },
    {
        "label": "Full",
        "value": "rounded-full"
    }
]

let dropShadow = [
    {
        "label": "none",
        "value": "drop-shadow-none"
    },
    {
        "label": "default",
        "value": "drop-shadow"
    },
    {
        "label": "small",
        "value": "drop-shadow-sm"
    },
    {
        "label": "medium",
        "value": "drop-shadow-md"
    },
    {
        "label": "large",
        "value": "drop-shadow-lg"
    },
    {
        "label": "xlarge",
        "value": "drop-shadow-xl"
    },
    {
        "label": "xxlarge",
        "value": "drop-shadow-2xl"
    }
]

let objectFit = [
    {
        "label": "Contain",
        "value": "object-contain"
    },
    {
        "label": "Cover",
        "value": "object-cover"
    },
    {
        "label": "Fill",
        "value": "object-fill"
    },
    {
        "label": "Auto",
        "value": "object-none"
    },
    {
        "label": "Scale Down",
        "value": "object-scale-down"
    }
]

let fontSize = [
    {
        "label": "xs",
        "value": "text-xs"
    },
    {
        "label": "sm",
        "value": "text-sm"
    },
    {
        "label": "normal",
        "value": "text-base"
    },
    {
        "label": "lg",
        "value": "text-lg"
    },
    {
        "label": "xl",
        "value": "text-xl"
    },
    {
        "label": "2xl",
        "value": "text-2xl"
    },
    {
        "label": "3xl",
        "value": "text-3xl"
    },
    {
        "label": "4xl",
        "value": "text-4xl"
    },
    {
        "label": "5xl",
        "value": "text-5xl"
    },
    {
        "label": "6xl",
        "value": "text-6xl"
    },
    {
        "label": "7xl",
        "value": "text-7xl"
    },
    {
        "label": "8xl",
        "value": "text-8xl"
    },
    {
        "label": "9xl",
        "value": "text-9xl"
    }
]

const config = {
    content: ["./src/**/*.{html,js,svelte,ts}"],
    theme: {
        extend: {},
    },

    safelist: [
        'text-black', 'bg-black', 'text-white', 'bg-white',
        'shadow', 'shadow-md', 'shadow-lg', 'shadow-none', 'shadow-sm', 'shadow-2xl', 'shadow-xl', 'shadow-inner',
        'flex', 'flex-col', 'flex-row', 'flex-col-reverse', 'flex-row-reverse', 'grid',
        'grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4', 'grid-cols-5', 'grid-cols-6', 'grid-cols-7', 'grid-cols-8',
        'lg:grid-cols-1', 'lg:grid-cols-2', 'lg:grid-cols-3', 'lg:grid-cols-4', 'lg:grid-cols-5', 'lg:grid-cols-6', 'lg:grid-cols-7', 'lg:grid-cols-8',
        'sm:grid-cols-1', 'sm:grid-cols-2', 'sm:grid-cols-3', 'sm:grid-cols-4', 'sm:grid-cols-5', 'sm:grid-cols-6', 'sm:grid-cols-7', 'sm:grid-cols-8',
        'md:grid-cols-1', 'md:grid-cols-2', 'md:grid-cols-3', 'md:grid-cols-4', 'md:grid-cols-5', 'md:grid-cols-6', 'md:grid-cols-7', 'md:grid-cols-8',
        ...classes,
        ...fontSize.map((fontSize) => fontSize.value),
        ...objectFit.map((fontSize) => fontSize.value),
        ...dropShadow.map((fontSize) => fontSize.value),
        ...borderRadius.map((fontSize) => fontSize.value)
    ],
    plugins: [],
};

module.exports = config;
