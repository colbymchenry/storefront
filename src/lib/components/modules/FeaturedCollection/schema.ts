import type {ISchema} from "../../component/ISchema";

export const schema: ISchema = {
    "name": "Featured Collection",
    "tag": "featured-collection",
    "settings": [
        {
            "type": "collection",
            "id": "collection",
            "label": "Collection"
        },
        {
            "type": "text",
            "id": "title",
            "label": "Title",
            "default": "Featured Collection"
        },
        {
            "type": "range",
            "id": "height",
            "label": "Height",
            "min": 20,
            "max": 50,
            "step": 1,
            "default": 30
        }
    ]
}