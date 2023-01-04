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

    return {
        reorder, arrayMove
    }
}

export const objectHelper = createObjectHelper();