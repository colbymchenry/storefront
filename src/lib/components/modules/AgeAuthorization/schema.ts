import type {ISchema} from "../../component/ISchema";

// 'header' | 'checkbox' | 'number' | 'radio' | 'range' | 'select' | 'text' | 'textarea' | 'collection' | 'color' | 'product' | 'image' | 'video'
export const schema: ISchema = {
    "name": "Age Authorization",
    "tag": "age-authorization",
    "settings": [
        {
            "type": "text",
            "id": "title",
            "label": "Title Text",
            "default": "AGE AUTHORIZATION"
        },
        {
            "type": "color",
            "id": "titleBgColor",
            "label": "Title Background Color",
            "default": "red-500"
        },
        {
            "type": "color",
            "id": "titleTextColor",
            "label": "Title Text Color",
            "default": "white"
        },
        {
            "type": "image",
            "id": "logo",
            "label": "Logo"
        },
        {
            "type": "textarea",
            "id": "content",
            "label": "Message",
            "default": "<p><strong>You must be 21 years of age or older to view this website.</strong><span> By entering this website, you agree that you are 21 years of age or older.</span></p>"
        },
        {
            "type": "color",
            "id": "buttonBgColor",
            "label": "Button Background Color",
            "default": "red-500"
        },
        {
            "type": "color",
            "id": "buttonTextColor",
            "label": "Button Text Color",
            "default": "white"
        },
    ]
}