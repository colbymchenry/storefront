import type ILSOrderItem from "./ILSOrderItem";
import type ILSDiscountCouponInfo from "./ILSDiscountCouponInfo";
import type ILSPersonInfo from "./ILSPersonInfo";
import type ILSShippingOptionInfo from "./ILSShippingOptionInfo";
import type ILSHandlingFeeInfo from "./ILSHandlingFeeInfo";
import type ILSDiscountInfo from "./ILSDiscountInfo";
import type ILSCreditCardStatus from "./ILSCreditCardStatus";

export default interface ILSOrderRequest {
    subtotal?: number;//	Order subtotal. Includes the sum of all products' cost in the order (item's price x quantity)
    total?: number;//	Order total cost. Includes shipping, taxes, discounts, etc.
    email?: string;//	Customer email address
    paymentMethod?: string;//	Payment method name
    paymentModule?: string;//	Payment processor name
    tax?: number;//	Tax total for order. Sum of all tax in order items, unless they were modified after order was placed
    customerTaxExempt?: boolean;//	true if customer is tax exempt, false otherwise. Learn more
    customerTaxId?: string;//	Customer tax ID
    customerTaxIdValid?: boolean;//	true if customer tax ID is valid, false otherwise
    reversedTaxApplied?: boolean;//	true if order tax was set to 0 because customer specified their valid tax ID in checkout process. false otherwise
    ipAddress?: string;//	Customer IP
    couponDiscount?: number;//	Discount applied to order using a coupon
    paymentStatus: 'AWAITING_PAYMENT' | 'PAID' | 'CANCELLED' | 'REFUNDED' | 'PARTIALLY_REFUNDED' | 'INCOMPLETE' | 'CUSTOM_PAYMENT_STATUS_1' | 'CUSTOM_PAYMENT_STATUS_2' | 'CUSTOM_PAYMENT_STATUS_3';//	Payment status. Ignored when creating orders with public token
    fulfillmentStatus: 'AWAITING_PROCESSING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'WILL_NOT_DELIVER' | 'RETURNED' | 'READY_FOR_PICKUP' | 'OUT_FOR_DELIVERY' | 'CUSTOM_FULFILLMENT_STATUS_1' | 'CUSTOM_FULFILLMENT_STATUS_2' | 'CUSTOM_FULFILLMENT_STATUS_3';//	Fulfillment status. Ignored when creating orders with public token
    refererUrl?: string;//	URL of the page when order was placed (without hash (#) part)
    orderComments?: string;//	Customer's order comments, specified at checkout
    volumeDiscount?: number;//	Sum of discounts based on subtotal. Is included into the discount field
    customerId?: number;//	Unique customer internal ID (if the order is placed by a registered user)
    hidden?: boolean;//	Determines if the order is hidden (removed from the list). Applies to unfinished orders only.
    membershipBasedDiscount?: number;//	Sum of discounts based on customer group. Is included into the discount field
    totalAndMembershipBasedDiscount?: number;//	The sum of discount based on subtotal AND customer group. Is included into the discount field
    discount?: number;//	The sum of all applied discounts except for the coupon discount. To get the total order discount, take the sum of couponDiscount and discount field values. Total order discount is a sum of all discounts applied to items (both regular discount and discount coupons) unless they were modified after order was placed
    globalReferer?: string;//	URL that the customer came to the store from
    createDate?: string;//	The date/time of order placement, e.g 2014-06-06 18:57:19 +0000
    customerGroup?: string;//	The name of group (membership) the customer belongs to
    discountCoupon?: ILSDiscountCouponInfo;//<DiscountCouponInfo>	Information about applied coupon
    items?: Array<ILSOrderItem>;//Array<OrderItem>	Order items
    billingPerson?: ILSPersonInfo;//<PersonInfo>	Name and billing address of the customer
    shippingPerson?: ILSPersonInfo;//<PersonInfo>	Name and address of the person entered in shipping information
    shippingOption?: ILSShippingOptionInfo;//<ShippingOptionInfo>	Information about selected shipping option
    handlingFee?: ILSHandlingFeeInfo;//<HandlingFeeInfo>	Handling fee details
    additionalInfo?: Map<string, string>;//	Additional order information if any (reserved for future use)
    paymentParams?: Map<string, string>;//	Additional payment parameters entered by customer on checkout, e.g. PO number in "Purchase order" payments
    discountInfo?: Array<ILSDiscountInfo>;//Array<DiscountInfo>	Information about applied discounts (coupons are not included)
    trackingNumber?: string;//	Shipping tracking code
    paymentMessage?: string;//	Message from the payment processor if any. It is present and visible in order details only if order status is not paid. When order becomes paid, paymentMessage is cleared
    externalTransactionId?: string;//	Transaction ID / invoice number of the order in the payment system (e.g. PayPal transaction ID)
    affiliateId?: string;//	Affiliate ID
    creditCardStatus?: ILSCreditCardStatus;//<CreditCardStatus>	The status of credit card payment
    privateAdminNotes?: string;//	Private note about the order from store owner. Ignored when creating orders with public token
    extraFields?: any;//<ExtraFieldsInfo>	Information about delivery date and time.
    pickupTime?: string;//	Order pickup time in the store date format, e.g.: "2017-10-17 05:00:00 +0000"
    acceptMarketing?: boolean;//	true if customer has accepted email marketing and you can use their email for promotions. If value is false, you can't use this email for promotions
    disableAllCustomerNotifications?: boolean;//	true if no email notifications are sent to customer. If false or empty, then email notifications are sent to customer according to store mail notification settings. This field does not influence admin email notifications
    externalFulfillment?: boolean;//	Set true if order is fulfilled in an external system; Ecwid will hide fulfillment status change feature and ability to set tracking number within Ecwid Control Panel in order details. Set false to manage order fulfillment within Ecwid Control Panel
    externalOrderId?: string;//	Corresponding order number in an external system where order is fulfilled. Use together with the externalFulfillment field
    pricesIncludeTax?: boolean;//	true if the tax rate is included in order price. More details: Taxes in Ecwid
}