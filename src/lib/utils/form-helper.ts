function createFormHelper() {
    function getFormData(form: HTMLFormElement) {
        const setValue = (object: Object, path: any, value: any) => {
            path = path.replace(/[\[]/gm, '.').replace(/[\]]/gm, ''); //to accept [index]
            let keys = path.split('.'),
                last = keys.pop();

            keys.reduce(function (o: any, k: any) {
                return o[k] = o[k] || {};
            }, object)[last] = value === "on" ? true : value === "off" ? false : value;
        }

        const formData = new FormData(form);


        let data: any = {};

        // @ts-ignore
        for (let field of formData) {
            const [key, value] = field;
            // take into account multiple select
            if (data[key]) {
                if (typeof data[key] === 'string') {
                    if (value !== "") {
                        setValue(data, key, [data[key], value]);
                    }
                } else if (Array.isArray(data[key])) {
                    setValue(data, key, [...data[key], value])
                } else {
                    if (value !== "") {
                        setValue(data, key, value === "false" || value === "true" ? value === "true" : value);
                    }
                }
            } else {
                if (value !== "") {
                    setValue(data, key, value === "false" || value === "true" ? value === "true" : value);
                }
            }
        }

        return data;
    }

    return {getFormData}

}


export const formHelper = createFormHelper();