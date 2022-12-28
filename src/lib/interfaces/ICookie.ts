import type ILSCategories from "./lightspeed/ILSCategories";

export default interface ICookie {
    is18: boolean;
    authenticated: boolean;
    idToken: string | undefined;
    categories: ILSCategories | undefined;
}