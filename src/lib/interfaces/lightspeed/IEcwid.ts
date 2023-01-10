export default interface IEcwid {
    Cart: IEcwidCart;

}

export interface IEcwidCart {
    addProduct: Function;
    calculateTotal: Function;
    canGotoCheckout: Function;
    clear: Function;
    get: Function;
    gotoCheckout: Function;
    removeProduct: Function;
    setAddress: Function;
    setBillingAddress: Function;
    setCustomerEmail: Function;
    setOrderComments: Function;
}