/** Geographic coordinates of an address, as strings. */
export interface Geo {
    lat: string;
    lng: string;
}

/** Postal address of a user. */
export interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}

/** Company a user works for. */
export interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

/** User returned by `GET /users`. */
export interface User {
    id: number;
    /** Full name, e.g. "Leanne Graham". */
    name: string;
    /** Handle, e.g. "Bret". */
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}
