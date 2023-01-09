import type ILSRecurringChargeSettings from "./ILSRecurringChargeSettings";

export default interface ILSubscriptionSettings {
    subscriptionAllowed?:boolean;//	true if the product can be sold as subscription ("Sell as subscription" product setting enabled). false otherwise.
    oneTimePurchaseAllowed?:boolean;//	true if the product can be purchased once, with no further charges on a regular basis. false otherwise.
    oneTimePurchasePrice?:number;//	The cost of the product by subscription with a one-time purchase, null by default.
    oneTimePurchasePriceFormatted?:string;//	The cost of the product for a one-time purchase, formatted according to the settings for displaying prices in the store.
    oneTimePurchaseMarkup?:number;//	The difference between the price of the product when subscribing and a one-time purchase in absolute values. Calculated automatically when oneTimePurchasePrice that isn’t equal to price is set.
    oneTimePurchaseMarkupFormatted?:string;//	The difference between the price of the product when subscribing and a one-time purchase in absolute values. Formatted according to the settings for displaying prices in the store. Updated automatically when the oneTimePurchaseMarkup is changed.
    oneTimePurchaseMarkupPercent?:number;//	The difference between the price of the product when subscribing and a one-time purchase as a percentage. Calculated automatically when oneTimePurchasePrice that isn’t equal to price is set.
    oneTimePurchaseMarkupPercentFormatted?:string;//	The difference between the price of the product when subscribing and a one-time purchase as a percentage. Formatted according to the settings for displaying prices in the store. Updated automatically when the oneTimePurchaseMarkupPercent is changed.
    recurringChargeSettings?:ILSRecurringChargeSettings;//	Recurring charge settings
}