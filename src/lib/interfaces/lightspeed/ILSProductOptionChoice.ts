export default interface ILSProductOptionChoice {
    // Option selection text, e.g. 'Green'
    text: string;
    // Percent or absolute value of the option's price markup. Positive, negative and zero values are allowed. Default is 0
    priceModifier: number;
    // 	Option markup calculation type. PERCENT or ABSOLUTE. Default is ABSOLUTE.
    priceModifierType: 'PERCENT' | 'ABSOLUTE';
}