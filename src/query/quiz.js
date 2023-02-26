import {gql} from "@apollo/client";

export const GET_QUIZ = gql(`
    query generateQuiz($userId: String!, $quizId: String!) {
        generateQuiz(userId: $userId, quizId: $quizId) {
            _id, title, max_score, score, completed, questions {
                _id, questionId, title, type, responses {
                    _id, responseId, title
                },
            }
        }
    }
`);