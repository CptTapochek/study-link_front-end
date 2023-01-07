import {gql} from "@apollo/client";

export const CREATE_COURSE = gql(`
    mutation createCourse($input: CourseInput) {
        createCourse(input: $input) {
            code, error
        }
    }
`);


/*
createCourse(input: $input) {
    title, processes, teacher{
        _id, name, surname, email
    }, subjects {
        title, type, files{
            title, size, type, data
        }, quiz_details{
            title, max_score, questions{
                title, type, responses{
                    title, correct
                }
            }
        }
    }
}
 */