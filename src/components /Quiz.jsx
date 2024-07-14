import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Quiz.css';
import Result from './Result';
import Question from './Question';

export default function Quiz() {
    const [categories, setCategories] = useState([]);
    const [selectcategory, setSelectcategory] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [questionindex, setQuestionindex] = useState(0);
    const [score, setScore] = useState(0);
    const [showresult, setShowresult] = useState(false);
    const [selectanswer, setSelectanswer] = useState(null);

    useEffect(() => {
        axios.get('https://opentdb.com/api_category.php')
            .then((res) => {
                console.log(res.data);
                console.log(res.data.trivia_categories);
                setCategories(res.data.trivia_categories);
            }).catch((err) => {
                console.log(err);
            })
    }, [])

    const categorySelect = (category) => {
        console.log(category);
        setSelectcategory(category);
        axios.get(`https://opentdb.com/api.php?amount=10&category=${category.id}&difficulty=easy&type=multiple`)
            .then((res) => {
                console.log(res.data.results) //
                const fetchquestion = res.data.results.map((question) => {
                    const incorrectanswer = question.incorrect_answers.map(answer => ({ answer, isCorrect: false }));
                    const correctanswer = { answer: question.correct_answer, isCorrect: true };
                    const allanswers = [...incorrectanswer, correctanswer];
                    return {
                        question: question.question,
                        answers: allanswers
        
                    }
                   
                })
               
                console.log(fetchquestion); // array of objects 10 questions and answers
                setQuestions(fetchquestion);
                setQuestionindex(0);
                setScore(0);
                setShowresult(false);
            }).catch((err) => {
                console.log(err);
            })
    }

    const answerclick = (isCorrect) => {
        if (selectanswer === null) {
            setSelectanswer(isCorrect); // Mark the answer as selected
            if (isCorrect) {
                setScore(score + 1);
            }
        }
    };

    const onrestart = () => {
        setSelectcategory(null);
        setQuestions([]);
        setQuestionindex(0);
        setScore(0);
        setShowresult(false);
        setSelectanswer(null);
    }

    const next = () => {
        setSelectanswer(null);
        if (questionindex < questions.length - 1) {
            setQuestionindex(questionindex + 1);
        } else {
            setShowresult(true);
        }
    }

    return (
        <>
            <div>
                {!selectcategory ? (
                    <div className="container container1">
                        <h2 className="head">Select a Category</h2>
                        <ul>
                            {categories.slice(11,16).map((category) => {
                                return <li key={category.id} className="list1"><button className="butt" onClick={() => categorySelect(category)}>{category.name}</button></li>
                            })}
                        </ul>
                    </div>
                ) : (
                    <>
                           {showresult ? (
                                <Result score={score} total={questions.length} restart={onrestart} />
                            ) : (
                            <>
                                {questions.length > 0 ?(
                                    <Question
                                        data={questions[questionindex]}
                                        answerClick={answerclick}
                                        selectAnswer={selectanswer}
                                        onNext={next}
                                    />
                                ):null}
                            </>
                        )}
                    </>
                )}
            </div>
        </>
    );
};
