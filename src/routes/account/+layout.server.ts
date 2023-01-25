import {project_id} from "../../lib/stores/cookies";
import type ICookie from "../../lib/interfaces/ICookie";
import type ILSShippingAddress from "../../lib/interfaces/lightspeed/ILSShippingAddress";
import type ILSCustomer from "../../lib/interfaces/lightspeed/ILSCustomer";

// @ts-ignore
export async function load({url, cookies}) {
    let cookie: ICookie = JSON.parse(cookies.get(project_id));

    let pactActData = {};
    let profileData: ILSCustomer = {
        email: undefined
    };
    let storesData: ILSShippingAddress[] = [];

    if (cookie?.user_id && cookie?.authenticated) {

    }

    return {
        pactAct: pactActData, profile: profileData, stores: storesData
    }
}