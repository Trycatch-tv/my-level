import q from "@assets/data/questions.json";
import "@pages/popup/Popup.css";
import { useState } from "react";
import Question from "./components/question/Question";

const Popup = () => {
  const [option, setOption] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  return (
    <div className="App">
      <header className="App-header">
        <h1>My Level</h1>
      </header>
      <div>
        <h3>In few questions youll know your software seniority level</h3>
        <button>Start</button>
        {q[0]?.title}------
        <Question
          title={q[0].title}
          options={q[0].options}
          selectedOption={option}
          handleChange={function (e): void {
            setOption(e.target.value);
            const optionSelected = q[0].options.filter(
              (o) => o.answer === e.target.value
            );
            setScore(optionSelected[0].score);
            // return alert(option + "-" + "score:" + score);
          }}
        />
      </div>
      <div>
        <p>Selected: {option}</p>
        <p>Score: {score}</p>
      </div>
    </div>
  );
};

export default Popup;
