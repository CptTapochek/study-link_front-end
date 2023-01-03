import {gql} from "@apollo/client";


export const SIGN_UP = gql(`
    mutation SignUp($input: SignUp) {
        SignUp(input: $input) {
            _id, email, type, name, surname, error,
        }
    }
`);