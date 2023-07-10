import {gql} from "@apollo/client";

export const GRADES_LIST = gql(`
    query getGrades($userId: String!) {
        getGrades(userId: $userId) {
            courseTitle, quizTitle, maxScore, score, approve, date {
                year, month, day
            }
        }
    }
`);