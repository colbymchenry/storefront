export default interface ILSAttributeValue {
    id?:number;//	Unique attribute ID. See Product types for the information on attribute IDs
    name?:string;//	Attribute displayed name
    value?:string;//	Attribute value
    type?:string;//	Attribute type. There are user-defined attributes, general attributes and special 'price per unit’ attributes. The 'type’ field contains one of the following: CUSTOM, UPC, BRAND, GENDER, AGE_GROUP, COLOR, SIZE, PRICE_PER_UNIT, UNITS_IN_PRODUCT
    show?:string;//	Defines where to display the product attribute value:. Supported values: NOTSHOW, DESCR, PRICE .
}
