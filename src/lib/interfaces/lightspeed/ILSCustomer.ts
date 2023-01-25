import type ILSPersonInfo from "./ILSPersonInfo";
import type ILSShippingAddress from "./ILSShippingAddress";

export default interface ILSCustomer {
    email: string;
    password?: string;
    billingPerson?: ILSPersonInfo;
    shippingAddresses?: ILSShippingAddress[];
    taxId?: string;
    taxIdValid?: boolean;
    b2b_b2c?: string;
    fiscalCode?: string;
    taxExempt?: boolean;
    acceptMarketing?: boolean;
}