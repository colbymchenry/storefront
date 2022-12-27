import type {ISchema} from "../../component/ISchema";

export const schema: ISchema = {
    "name": "Navigation",
    "tag": "navigation",
    "class": "w-full",
    "settings": [
        {
            "type": "color",
            "id": "bgColor",
            "label": "Background Color",
            "default": "white"
        },
        {
            "type": "color",
            "id": "textColor",
            "label": "Text Color",
            "default": "slate-800"
        },
        {
            "type": "image",
            "id": "logo",
            "label": "Logo"
        },
        {
            "type": "range",
            "id": "logoHeight",
            "label": "Logo Height",
            "min": 10,
            "max": 100,
            "step": 1,
            "unit": '%',
            "default": 100
        },
        {
            "type": "select",
            "id": "dropShadow",
            "label": "Drop Shadow",
            "default": "drop-shadow-none",
            "options": [
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
        },
        {
            "type": "header",
            "label": "Search"
        },
        {
            "type": "color",
            "id": "searchBgColor",
            "label": "Background Color",
            "default": "gray-300"
        },
        {
            "type": "color",
            "id": "searchTextColor",
            "label": "Text Color",
            "default": "gray-700"
        }
    ],
    "blocks": [
        {
            "name": "Route",
            "type": "route",
            "settings": [
                {
                    "type": "url",
                    "id": "href",
                    "label": "Link"
                }
            ]
        }
    ]
}