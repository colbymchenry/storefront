import type {ISchema} from "../../component/ISchema";
import {heightValues} from "../../component/ISchema";

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
            "id": "imgHeight",
            "label": "Image Height",
            "values": heightValues,
            "default": 22
        }
    ]
}