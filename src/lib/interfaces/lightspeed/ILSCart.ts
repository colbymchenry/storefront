export default interface ILSCart {
    subtotal: number;
    total: number;
    email: string;
    paymentMethod: string;
    paymentModule: string;	// Payment processor name
    tax: number;	// Tax total
    customerTaxExempt: boolean;	// true if customer is tax exempt, false otherwise. Learn more
    customerTaxId: string;	// Customer tax ID
    customerTaxIdValid: boolean;	// true if customer tax ID is valid, false otherwise
    reversedTaxApplied: boolean;	// true if order tax was set to 0 because customer specified their valid tax ID in checkout process. false otherwise
    b2b_b2c: string;	// Order type: business-to-business (b2b) or business-to-consumer (b2c)
    customerRequestedInvoice: boolean; // true if customer requested an invoice, false otherwise
    customerFiscalCode: string;	// Fiscale code of a customer
    electronicInvoicePecEmail: string;	// PEC email for invoices
    electronicInvoiceSdiCode: string;	// SDI code for invoices
    ipAddress: string;	// Customer IP
    refererUrl: string;	// URL of the page when order was placed (without hash (#) part)
    orderComments: string;	// Order comments
    couponDiscount: number;	// Discount applied to order using a coupon
    volumeDiscount: number;	//Sum of discounts based on subtotal. Is included into the discount field
    discount: number;	//The sum of all applied discounts except for the coupon discount. To get the total order discount, take the sum of couponDiscount and discount field values
    membershipBasedDiscount: number;	//Sum of discounts based on customer group. Is included into the discount field
    totalAndMembershipBasedDiscount: number;	//The sum of discount based on subtotal AND customer group. Is included into the discount field
    discountCoupon: any;	//<DiscountCouponInfo>	Information about applied coupon
    discountInfo: any;	//Array<DiscountInfo>	Information about applied discounts (coupons are not included)
    customerId: number;	//Unique customer internal ID (if the order is placed by a registered user)
    hidden: boolean;	//Determines if the order is hidden (removed from the list). Applies to unsfinished orders only.
    usdTotal: number;	//Order total in USD
    globalReferer: string;	//URL that the customer came to the store from
    createDate: string;	//The date/time of order placement, e.g 2014-06-06 18:57:19 +0000
    updateDate: string;	//The date/time of the last order change, e.g 2014-06-06 18:57:19 +0000
    createTimestamp: number;	//The date of order placement in UNIX Timestamp format, e.g 1427268654
    updateTimestamp: number;	//The date of the last order change in UNIX Timestamp format, e.g 1427268654
    customerGroupId: number;	//Customer group ID
    customerGroup: string;	//The name of group (membership) the customer belongs to
    items: any; // Array<OrderItem> Order items
    billingPerson: any;// <PersonInfo> Name and billing address of the customer
    shippingPerson: any;	// <PersonInfo> Name and address of the person entered in shipping information
    shippingOption: any;	//<ShippingOptionInfo> Information about selected shipping option
    handlingFee: any;	//Handling fee details
    additionalInfo: Map<string, string>;	//Additional order information if any (reserved for future use)
    paymentParams: Map<string, string>;	//Additional payment parameters entered by customer on checkout, e.g. PO number in "Purchase order" payments
    trackingNumber: string;	//Shipping tracking code
    paymentMessage: string;	//Message from the payment processor if any
    externalTransactionId: string;	//Transaction ID / invoice number of the order in the payment system (e.g. PayPal transaction ID)
    affiliateId: string;	//Affiliate ID
    creditCardStatus: any;	// <CreditCardStatus>	The status of credit card payment
    recoveredOrderId: number	//Order number. Is present if the abandoned cart was successfully recovered
    recoveryEmailSentTimestamp: string;	//The date/time of the last order change, e.g 2014-06-06 18:57:19 +0000
    acceptMarketing: boolean;	//true if customer agreed to accept marketing emails. false otherwise.
    taxesOnShipping: any[]; // Array<TaxOnShipping>	Taxes applied to shipping. null for old carts, [] for carts with taxes applied to subtotal only. Are not recalculated if cart is updated later manually. Is calculated like: (shippingRate + handlingFee)*(taxValue/100)
}