export default interface ILSRecurringChargeSettings {
    recurringInterval?: string;//	Charge recurring interval. Supported values: DAY, WEEK, MONTH, YEAR.
    recurringIntervalCount?: number;//	Charge recurring interval. Supported values: for DAY - 1 (daily), for WEEK - 1 (weekly), 2 (biweekly), for MONTH - 1 (monthly), 3 (quarterly), for YEAR - 1 (annually).
    subscriptionPriceWithSignUpFee?: number;//	The cost of the product for the first subscription order.
    subscriptionPriceWithSignUpFeeFormatted?: string;//	The cost of the product for the first subscription order. Formatted according to the settings for displaying prices in the store. Updated automatically when the subscriptionPriceWithSignUpFee is changed.
    signUpFee?: number;//	The size of the markup that is imposed on the first order.
    signUpFeeFormatted?: string;//	The size of the markup that is imposed on the first order. Formatted according to the settings for displaying prices in the store. Updated automatically when the signUpFee is changed.
}