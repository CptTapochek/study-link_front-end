import {gql} from "@apollo/client";


export const SUBMIT_QUIZ = gql(`
    mutation submitQuiz($input: QuizInput) {
        submitQuiz(input: $input) {
           code, error
        }
    }
`);