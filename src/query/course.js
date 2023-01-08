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

export const GET_COURSE = gql(`
    query getCourse($id: String!) {
        getCourse(id: $id) {
            _id, title, processes, progress, teacher {
                _id, name, surname, email
            }, subjects {
                _id, title, type, files {
                    _id, title, type, size
                }, quiz_details {
                    title, max_score, score, state
                }
            }
        }
    }
`);