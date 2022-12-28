import {gql} from "@apollo/client";

export const CREATE_USER = gql(`
    mutation createUser($input: UserInput) {
        createUser(input: $input) {
            id, username, age 
        }
    }
`);

export const SIGN_UP = gql(`
    mutation SignUp($input: SignUp) {
        SignUp(input: $input) {
            _id, email, type, name, surname, error,
        }
    }
`);