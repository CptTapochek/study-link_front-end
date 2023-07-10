import style from "./quiz.module.css";
import React, {useEffect, useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {GET_QUIZ} from "../../query/quiz";
import {SUBMIT_QUIZ} from "../../mutations/quiz";
import {useNavigate} from "react-router-dom";


const Quiz = () => {
    const navigate = useNavigate();
    const [tempQuiz, setTempQuiz] = useState([]);
    const [submitQuiz] = useMutation(SUBMIT_QUIZ);
    const user = JSON.parse(localStorage.getItem("user"));
    const quizID = window.location.pathname.split("/")[4].toString();
    const {data, loading, error} = useQuery(GET_QUIZ, {
        variables: {
            userId: user["_id"],
            quizId: quizID.toString()
        }
    });
    useEffect(() => {
        if(!loading) {
            setTempQuiz(data["generateQuiz"]);
        }
    }, [data]);

    const [questions, setQuestions] = useState([]);

    const sendDates = async (e) => {
        e.preventDefault();
        submitQuiz({
            variables: {
                input: {
                    quizId: quizID.toString(),
                    userId: user._id,
                    questions: questions,
                    draft_questions: []
                }
            }
        }).then (({data}) => {
            if (data.submitQuiz.code.toString() == "200"){
                navigate("/courses");
            } else {
                alert(data.submitQuiz.error);
            }
        });
    };

    const quizElements = tempQuiz["questions"] !== undefined ?
        tempQuiz["questions"].map(
            item => <QuizItems
                key={item._id}
                questionId={item["questionId"]}
                type={item.type}
                title={item.title}
                responses={item.responses}
                setQuestions={setQuestions}
                questions={questions}
            />
    ) : <div/>;

    return (
        <div className={style.main}>
            <div className={style.profileTitle}>
                <p>Quiz example title</p>
            </div>
            <form className={style.mainQuizList} onSubmit={sendDates}>
                {quizElements}
                <div className={style.submitButton}>
                    <button type="submit">Send</button>
                </div>
            </form>
        </div>
    );
}

class QuizItems extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let Question;
        const question = this.props;

        const onChangeInputMultiResponse = (e) => {
            const {name, value} = e.target;
            const checked = e.target.checked;
            let questionsState = question.questions;
            let existQuestion = false;
            for (let idx = 0; idx < questionsState.length; idx++) {
                if (questionsState[idx]["_id"] == name){
                    existQuestion = true;
                    if(checked) {
                        questionsState[idx]["correct_response_id"].push(value);
                    } else {
                        const removeIndex = questionsState[idx]["correct_response_id"].indexOf(value);
                        questionsState[idx]["correct_response_id"].splice(removeIndex, 1)
                    }
                }
            }
            if(!existQuestion) {
                questionsState.push({
                    _id: name,
                    type: "MULTI_RESPONSE",
                    text_response: "",
                    correct_response_id: [value.toString()]
                });
            }
            question.setQuestions(questionsState);
        }

        const onChangeInputOneResponse = (e) => {
            const {name, value} = e.target;
            let questionsState = question.questions;
            let existQuestion = false;
            for (let idx = 0; idx < questionsState.length; idx++) {
                if (questionsState[idx]["_id"] == name){
                    existQuestion = true;
                    questionsState[idx]["correct_response_id"] = [value.toString()];
                }
            }
            if(!existQuestion) {
                questionsState.push({
                    _id: name,
                    type: "ONE_RESPONSE",
                    text_response: "",
                    correct_response_id: [value.toString()]
                });
            }
            question.setQuestions(questionsState);
        }

        const onChangeInputTextResponse = (e) => {
            const {name, value} = e.target;
            let questionsState = question.questions;
            let existQuestion = false;
            for (let idx = 0; idx < questionsState.length; idx++) {
                if (questionsState[idx]["_id"] == name){
                    existQuestion = true;
                    questionsState[idx]["text_response"] = value;
                }
            }
            if(!existQuestion) {
                questionsState.push({
                    _id: name,
                    type: "TEXT_RESPONSE",
                    text_response: value,
                    correct_response_id: []
                });
            }
            question.setQuestions(questionsState);
        }

        switch (question.type) {
            case "MULTI_RESPONSE":
                Question = (
                    <div className={style.quiz}>
                        <div className={style.quizTitle}>{question.title}</div>
                        <div className={style.multiResponseList}>
                            {
                                question.responses.map(
                                item => (
                                    <div className={style.multiResponse} key={Math.random()}>
                                        <input type="checkbox" name={question.questionId} onChange={onChangeInputMultiResponse} value={item["responseId"]}/>
                                        <p>{item["title"]}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                );
                break;
            case "ONE_RESPONSE":
                Question = (
                    <div className={style.quiz}>
                        <div className={style.quizTitle}>{question.title}</div>
                        <div className={style.oneResponseList}>
                            {
                                question.responses.map(
                                item => (
                                    <div className={style.oneResponse} key={Math.random()}>
                                        <input type="radio" name={question.questionId} value={item["responseId"]} onChange={onChangeInputOneResponse}/>
                                        <p>{item["title"]}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                );
                break;
            case "TEXT_RESPONSE":
                Question = (
                    <div className={style.quiz}>
                        <div className={style.quizTitle}>{question.title}</div>
                        <div className={style.textResponse}>
                            <textarea placeholder="My Response" name={question.questionId} onChange={onChangeInputTextResponse}></textarea>
                        </div>
                    </div>
                );
                break;
        }
        return Question;
    }
}

export default Quiz;