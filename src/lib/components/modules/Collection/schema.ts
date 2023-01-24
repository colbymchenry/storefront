import type {ISchema} from "$lib/components/component/ISchema";
import {SchemaTemplates} from "../SchemaTemplates";

export const schema: ISchema = {
    "name": "Collection",
    "tag": "collection",
    "class": "w-full h-full flex",
    "settings": [
        {
            "type": "color",
            "id": "buttonBgColor",
            "label": "Add to Cart BG Color",
            "default": "slate-800"
        },
        {
            "type": "color",
            "id": "buttonTextColor",
            "label": "Add to Cart Text Color",
            "default": "slate-50"
        },
        {
            "type": "color",
            "id": "priceColor",
            "label": "Price Color",
            "default": "black"
        },
        {
            "type": "select",
            "id": "priceFont",
            "label": "Price Font",
            "default": "Kanit",
            "options": SchemaTemplates.fontFamily
        },
        {
            "type": "range",
            "min": 1,
            "max": 5,
            "step": 1,
            "id": "desktopGridCount",
            "label": "Desktop Grid Count",
            "default": 4
        },
        {
            "type": "range",
            "min": 1,
            "max": 5,
            "step": 1,
            "id": "mobileGridCount",
            "label": "Mobile Grid Count",
            "default": 2
        }
    ]
}