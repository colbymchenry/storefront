import type {ISchema} from "../../component/ISchema";

// 'header' | 'checkbox' | 'number' | 'radio' | 'range' | 'select' | 'text' | 'textarea' | 'collection' | 'color' | 'product' | 'image' | 'video'
export const schema: ISchema = {
    "name": "Hero Slider",
    "tag": "hero-slider",
    "settings": [
        {
            "type": "range",
            "id": "height",
            "label": "Height",
            "unit": "%",
            "min": 20,
            "max": 100,
            "step": 5,
            "default": 50
        }
    ],
    "blocks": [
        {
            "name": "Slide",
            "type": "slide",
            "settings": [
                {
                    "type": "image",
                    "id": "image",
                    "label": "Image"
                },
                {
                    "type": "url",
                    "id": "url",
                    "label": "URL"
                }
            ]
        }
    ]
}