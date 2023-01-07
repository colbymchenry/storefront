export default interface ILSShippingOptionInfo {
    shippingCarrierName?:string;//	Optional. Is present for orders made with carriers, e.g. USPS or shipping applications.
    shippingMethodName?:string;//	Shipping option name
    shippingRate?:number;//	Rate
    estimatedTransitTime?:string;//	Delivery time estimation. Formats accepted: number "5", several days estimate "4-9"
    pickupInstruction?:string;//	Instruction for customer on how to receive their products
    fulfillmentType?:string;//	Contains one of the values: shipping, pickup, delivery
    isPickup?:boolean;//	Set to true if the order must have a pickup method (temporary field)
}