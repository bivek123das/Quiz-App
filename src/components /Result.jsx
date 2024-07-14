import React from "react";
import './Quiz.css';

const Result = (props) => {
    return (
        <>
            <div className="container container1">
                <h1 className="head-result">Quiz Completed</h1>
                <p className="para-result">Your Score: {props.score} / {props.total}</p>
                <button className="btn-result" onClick={props.restart}>Restart Quiz</button>
            </div>
        </>
    )
}

export default Result;
