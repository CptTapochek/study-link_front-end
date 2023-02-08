import style from "./quiz.module.css";
import React, {useEffect, useState} from "react";
import {useQuery} from "@apollo/client";
import {GET_QUIZ} from "../../query/quiz";


const Quiz = () => {
    const [tempQuiz, setTempQuiz] = useState([]);

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

    const [response, setResponse] = useState([]);
    const [quiz, setQuiz] = useState({
        id: "35345",
        title: "Random quiz title",
        questions: [
            {
                id: "4732737",
                title: "Question title 1. What are the correct colors?",
                type: "multi-response",
                responses: ["Red", "Green", "Blue"]
            },
            {
                id: "57374884",
                title: "Question title 2. What is the worst audi?",
                type: "one-response",
                responses: ["A4", "A3", "Rs6", "A2"]
            },
            {
                id: "853475389",
                title: "Question title 3. Mixin, what it means?",
                type: "text-response",
            },
            {
                id: "74757578",
                title: "Question title 4. What are the principles of OOP?",
                type: "multi-response",
                responses: ["Abstraction", "encapsulation", "Fast work", "inheritance", "cool work style", "polymorphism"]
            },
        ]
    });

    const sendDates = async (e) => {
        e.preventDefault();
        console.log("^^^^^^^^^", response);
    };

    const quizElements = quiz["questions"].map(
        item => <QuizItems
            key={item.id}
            name={item.id}
            type={item.type}
            title={item.title}
            responses={item.responses}
            setResponse={setResponse}
            response={response}
        />
    );

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
        const quiz = this.props;

        const onChangeInputOneResponse = (e) => {
            const {name, value} = e.target;
            let response = quiz.response;
            if (response.length > 0){
                let exist = false;
                for (let idx = 0; idx < response.length; idx++) {
                    if (response[idx]["name"] == name) {
                        exist = true;
                        response[idx]["response"] = value;
                    }
                }
                if(exist == false) {
                    response.push({ name: name, response: value, type: "one-response" });
                }
            } else {
                response.push({ name: name, response: value, type: "one-response" });
            }
            quiz.setResponse(response)
        }

        const onChangeInputTextResponse = (e) => {
            const {name, value} = e.target;
            let response = quiz.response;
            if (response.length > 0){
                let exist = false;
                for (let idx = 0; idx < response.length; idx++) {
                    if (response[idx]["name"] == name) {
                        exist = true;
                        response[idx]["response"] = value;
                    }
                }
                if(exist == false) {
                    response.push({ name: name, response: value, type: "text" });
                }
            } else {
                response.push({ name: name, response: value, type: "text" });
            }
            quiz.setResponse(response)
        }

        const onChangeInputMultiResponse = (e) => {
            const {name, value} = e.target;
            let response = quiz.response;
            if (response.length > 0) {
                let exist = false;
                for (let idx = 0; idx < response.length; idx++) {
                    if (response[idx]["name"] == name) {
                        exist = true;
                        let existElement = false;
                        let currentValues = response[idx]["response"];
                        currentValues.forEach(element => {
                            if(element == value){ existElement = true; }
                        })
                        if(existElement) {
                            const index = currentValues.indexOf(value);
                            if (index > -1) { currentValues.splice(index, 1); }
                        } else {
                            currentValues.push(value);
                        }
                        response[idx]["response"] = currentValues;
                    }
                }
                if(exist == false) {
                    response.push({ name: name, response: [value], type: "multi-response" });
                }
            } else {
                response.push({ name: name, response: [value], type: "multi-response" });
            }
            quiz.setResponse(response)
        }

        switch (quiz.type) {
            case "multi-response":
                Question = (
                    <div className={style.quiz}>
                        <div className={style.quizTitle}>{quiz.title}</div>
                        <div className={style.multiResponseList}>
                            {
                                quiz.responses.map(
                                item => (
                                    <div className={style.multiResponse} key={Math.random()}>
                                        <input type="checkbox" name={quiz.name} value={item} onChange={onChangeInputMultiResponse}/>
                                        <p>{item}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                );
                break;
            case "one-response":
                Question = (
                    <div className={style.quiz}>
                        <div className={style.quizTitle}>{quiz.title}</div>
                        <div className={style.oneResponseList}>
                            {
                                quiz.responses.map(
                                item => (
                                    <div className={style.oneResponse} key={Math.random()}>
                                        <input type="radio" name={quiz.name} value={item} onChange={onChangeInputOneResponse}/>
                                        <p>{item}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                );
                break;
            case "text-response":
                Question = (
                    <div className={style.quiz}>
                        <div className={style.quizTitle}>{quiz.title}</div>
                        <div className={style.textResponse}>
                            <textarea placeholder="My Response" name={quiz.name} onChange={onChangeInputTextResponse}></textarea>
                        </div>
                    </div>
                );
                break;
        }
        return Question;
    }
}

export default Quiz;