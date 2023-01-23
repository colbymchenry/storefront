import type {ISchema} from "../../component/ISchema";
import {SchemaTemplates} from "../SchemaTemplates";

export const schema: ISchema = {
    "name": "Add to cart button",
    "tag": "add-to-cart-button",
    "class": "w-full mt-4 lg:mt-12",
    "settings": [
        {
            "type": "text",
            "id": "title",
            "label": "Text",
            "default": "Add to Cart"
        },
        {
            "type": "color",
            "id": "bgColor",
            "label": "Button Color",
            "default": "black"
        },
        {
            "type": "color",
            "id": "textColor",
            "label": "Text Color",
            "default": "white"
        },
        {
            "type": "select",
            "id": "fontSize",
            "label": "Font Size",
            "default": "text-2xl",
            "options": SchemaTemplates.fontSize
        },
        {
            "type": "select",
            "id": "borderRadius",
            "label": "Border Radius",
            "default": "rounded-none",
            "options": SchemaTemplates.borderRadius
        },
        {
            "type": "select",
            "id": "dropShadow",
            "label": "Drop Shadow",
            "default": "drop-shadow-none",
            "options": SchemaTemplates.dropShadow
        }
    ]
}