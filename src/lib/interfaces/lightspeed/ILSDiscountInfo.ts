export default interface ILSDiscountInfo {
    value?: number;
    type?: 'ABS' | 'PERCENT';
    base?: 'ON_TOTAL' | 'ON_MEMBERSHIP' | 'ON_TOTAL_AND_MEMBERSHIP';
}