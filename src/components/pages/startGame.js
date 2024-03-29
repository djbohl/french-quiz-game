import React, { useContext } from "react";
import { QuizContext } from "../Helpers/quizContext";


export default function StartGame() {

    //import quizcontext to keep track of quizstate

    const { setQuizState } = useContext(QuizContext);

    return (
        <div className="start-container">
            <h1>French Quiz</h1>
            <p className="intro">Welcome to the French Quiz Adventure!
                Embark on a journey to test and sharpen your French skills!
                Let's have some fun as we explore the depths of your knowledge!
                Let's begin this exciting French quiz quest! Ready?</p>
            <button className="start-bttn"
                onClick={() => {
                    setQuizState("Levels");
                }}
            >
                Let's Go!
            </button>
        </div>
    );
};