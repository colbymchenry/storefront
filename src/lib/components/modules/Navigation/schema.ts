import type {ISchema} from "../../component/ISchema";
import {heightValues} from "../../component/ISchema";
import {SchemaTemplates} from "../SchemaTemplates";

export const schema: ISchema = {
    "name": "Navigation",
    "tag": "navigation",
    "class": "w-full",
    "settings": [
        {
            "type": "range",
            "id": "desktopHeight",
            "label": "Desktop Height",
            "values": heightValues,
            "default": 24
        },
        {
            "type": "range",
            "id": "mobileHeight",
            "label": "Mobile Height",
            "values": heightValues,
            "default": 14
        },
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
            "options": SchemaTemplates.dropShadow
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
        },
        {
            "type": "header",
            "label": "Desktop Navbar"
        },
        {
            "type": "color",
            "id": "navbarBgColor",
            "label": "Background Color",
            "default": "black"
        },
        {
            "type": "color",
            "id": "navbarTextColor",
            "label": "Link Color",
            "default": "white"
        },
        {
            "type": "color",
            "id": "navbarHoverTextColor",
            "label": "Link Hover Color",
            "default": "red-700"
        },
        {
            "type": "color",
            "id": "navbarHoverMenuBgColor",
            "label": "Hover Menu BG Color",
            "default": "white"
        },
        {
            "type": "color",
            "id": "navbarHoverMenuTextColor",
            "label": "Hover Menu Link Color",
            "default": "black"
        },
        {
            "type": "color",
            "id": "navbarHoverMenuHoverTextColor",
            "label": "Hover Menu Link Hover Color",
            "default": "red-700"
        },
        {
            "type": "color",
            "id": "cartBgColor",
            "label": "Cart Pill BG Color",
            "default": "green-600"
        },
        {
            "type": "color",
            "id": "cartTextColor",
            "label": "Cart Pill Text Color",
            "default": "white"
        }
    ]
}