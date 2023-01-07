import {gql} from "@apollo/client";

export const COURSE_LIST = gql(`
    query getCoursesList($userId: String!) {
        getCoursesList(userId: $userId) {
            _id, title, processes, progress, teacher {
                _id, name, surname, email
            }
        }
    }
`);