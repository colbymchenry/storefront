import type ICookie from "$lib/interfaces/ICookie";

export let cookieStorage: ICookie = {
    "is18": false,
    "authenticated": false,
    "idToken": undefined,
    "categories": undefined,
    "admin": false,
    "staff": false,
    "salesRep": false,
    "pactActApproved": false
}