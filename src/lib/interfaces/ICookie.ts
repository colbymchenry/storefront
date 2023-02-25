import type ILSCategories from "./lightspeed/ILSCategories";

export default interface ICookie {
    is18: boolean;
    authenticated: boolean;
    idToken: string | undefined;
    categories: ILSCategories | undefined;
    email?: string;
    email_verified?: boolean;
    user_id?: string;
    admin?: boolean;
    staff?: boolean;
    salesRep?: boolean;
    pactActApproved?: boolean;
}