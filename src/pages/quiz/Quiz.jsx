import style from "./quiz.module.css";
import React, {useState} from "react";
import {NavLink} from "react-router-dom";


const Quiz = () => {

    const sendDates = async (e) => {
        e.preventDefault();
    };

    return (
        <div className={style.main}>
            <div className={style.profileTitle}>
                <p>Quiz example title</p>
            </div>
            <form className={style.mainQuizList} onSubmit={sendDates}>
                <div className={style.quiz}>
                    <div className={style.quizTitle}>Question 1</div>
                    <div className={style.oneResponseList}>
                        <div className={style.oneResponse}>
                            <input type="radio" name="question_1" value="1"/><p>Green</p>
                        </div>
                        <div className={style.oneResponse}>
                            <input type="radio" name="question_1" value="2"/><p>Red</p>
                        </div>
                        <div className={style.oneResponse}>
                            <input type="radio" name="question_1" value="3"/><p>Blue</p>
                        </div>
                    </div>
                </div>
                <div className={style.quiz}>
                    <div className={style.quizTitle}>Question 2</div>
                    <div className={style.multiResponseList}>
                        <div className={style.multiResponse}>
                            <input type="checkbox" name="question_2" value="1"/><p>Variant 1</p>
                        </div>
                        <div className={style.multiResponse}>
                            <input type="checkbox" name="question_2" value="2"/><p>Variant 2</p>
                        </div>
                        <div className={style.multiResponse}>
                            <input type="checkbox" name="question_2" value="3"/><p>Variant 3</p>
                        </div>
                    </div>
                </div>
                <div className={style.quiz}>
                    <div className={style.quizTitle}>Question 3</div>
                    <div className={style.textResponse}>
                        <textarea placeholder="My Response">

                        </textarea>
                    </div>
                </div>
                <div className={style.submitButton}>
                    <button type="submit">Send</button>
                </div>
            </form>
        </div>
    );
}

export default Quiz;