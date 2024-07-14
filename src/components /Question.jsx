import React from "react";
import './Quiz.css';

const Question = (props) => {
    return (
        <>
            <div className="container container1 cont" style={{ width: '70vw' }}>
                <h2 className="ques">{props.data.question}</h2>
                <div className="ans">
                    {
                        props.data.answers.map((answer, index) => (
                            <button key={index} onClick={() => props.answerClick(answer.isCorrect)}>
                                {answer.answer}
                            </button>
                        ))
                    }

                </div>
                   {props.selectAnswer !== null ? (
                        <button className="btn-result" onClick={props.onNext}>Next Question</button>
                   ):null}
            </div>
        </>
    )
}

export default Question;