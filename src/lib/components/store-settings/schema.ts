import type {ISchema} from "../component/ISchema";

export const schema: ISchema = {
    "name": "Store",
    "tag": "store",
    "settings": [
        {
            "type": "text",
            "id": "businessName",
            "label": "Store Name",
            "default": "eComm"
        },
        {
            "type": "text",
            "id": "businessPhone",
            "label": "Contact Number",
            "placeholder": "000-000-0000",
            "regex": "^[1-9]\\d{2}-\\d{3}-\\d{4}"
        },
        {
            "type": "color",
            "id": "primaryColor",
            "label": "Primary Color",
            "default": "red-500"
        },
        {
            "type": "color",
            "id": "secondaryColor",
            "label": "Secondary Color",
            "default": "white"
        },
        {
            "type": "image",
            "id": "logo",
            "label": "Logo"
        },

    ]
}