import {gql} from "@apollo/client";

export const GET_ALL_USERS = gql(`
    query {
        getAllUsers {
            id, username, age
        }
    }
`);

export const LOGIN = gql(`
    query login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            _id, email, type, name, surname, error,
        }
    }
`);