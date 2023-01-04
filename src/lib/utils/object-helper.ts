function createObjectHelper() {
    const reorder = (order: any, obj: any) => {
        typeof order === 'string' && (order = order.split (/\s*,\s*/));
        return order.reduce (function (rslt: any, prop: any) {
            rslt[prop] = obj[prop];
            return rslt;
        }, {});
    }

    const arrayMove = (arr: any[], old_index: number, new_index: number) => {
        while (old_index < 0) {
            old_index += arr.length;
        }
        while (new_index < 0) {
            new_index += arr.length;
        }
        if (new_index >= arr.length) {
            var k = new_index - arr.length + 1;
            while (k--) {
                arr.push(undefined);
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        return arr;
    };

    const slugify = (text: string) => {
        return text
            .toString()                   // Cast to string (optional)
            .normalize('NFKD')            // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
            .toLowerCase()                // Convert the string to lowercase letters
            .trim()                       // Remove whitespace from both sides of a string (optional)
            .replace(/\s+/g, '-')         // Replace spaces with -
            .replace(/[^\w\-]+/g, '')     // Remove all non-word chars
            .replace(/\_/g,'-')           // Replace _ with -
            .replace(/\-\-+/g, '-')       // Replace multiple - with single -
            .replace(/\-$/g, '');         // Remove trailing -
    }

    return {
        reorder, arrayMove, slugify
    }
}

export const objectHelper = createObjectHelper();