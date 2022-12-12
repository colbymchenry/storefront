export default interface IThemeObject {
    classes?: string;
    styles?: string;
    padding: IBounds;
    margin: IBounds;
    bgColor?: string;
    textColor?: string;
    dropShadow?: string;
    boxShadow?: string;
    rounded?: string;
    isItalic?: boolean;
    isBold?: boolean;
    isUnderline?: boolean;
    isOverline?: boolean;
    isStrikethrough?: boolean;
    fontSize?: string;
    props?: unknown;
}

export interface IBounds {
    left?: number;
    top?: number;
    right?: number;
    bottom?: number;
}