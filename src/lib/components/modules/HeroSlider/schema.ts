import type {ISchema} from "../../component/ISchema";

// 'header' | 'checkbox' | 'number' | 'radio' | 'range' | 'select' | 'text' | 'textarea' | 'collection' | 'color' | 'product' | 'image' | 'video'
export const schema: ISchema = {
    "name": "Hero Slider",
    "tag": "hero-slider",
    "information": `<p>Please make sure all uploaded images are the same dimensions or else clipping will occur.`,
    "settings": [
        {
            "type": "color",
            "id": "controlsColor",
            "label": "Controls Color",
            "default": "white"
        },
        {
            "type": "checkbox",
            "id": "autoHeight",
            "label": "Auto Height",
            "default": true
        },
        {
            "type": "range",
            "id": "height",
            "label": "Height",
            "min": 10,
            "max": 100,
            "step": 1,
            "default": 30
        },
        {
            "type": "select",
            "id": "objectFit",
            "label": "Image Fit",
            "default": "object-cover",
            "options": [
                {
                    "label": "Contain",
                    "value": "object-contain"
                },
                {
                    "label": "Cover",
                    "value": "object-cover"
                },
                {
                    "label": "Fill",
                    "value": "object-fill"
                },
                {
                    "label": "Auto",
                    "value": "object-none"
                },
                {
                    "label": "Scale Down",
                    "value": "object-scale-down"
                }
            ]
        },
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
                },
                {
                    "type": "text",
                    "id": "alt",
                    "label": "Img Alt (SEO)"
                },
                {
                    "type": "range",
                    "id": "objectPosX",
                    "label": "Image Position (X)",
                    "min": 10,
                    "max": 100,
                    "step": 1,
                    "default": 50
                },
                {
                    "type": "range",
                    "id": "objectPosY",
                    "label": "Image Position (Y)",
                    "min": 10,
                    "max": 100,
                    "step": 1,
                    "default": 50
                }
            ]
        }
    ]
}