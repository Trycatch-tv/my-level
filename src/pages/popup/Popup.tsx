import q from "@assets/data/questions.json"
import "@pages/popup/Popup.css"
import { useState } from "react"
import Question from "./components/question/Question"

const Popup = () => {
  const [option, setOption] = useState<string>("")
  const [score, setScore] = useState<number>(0)
  const [questionNumber, setQuestionNumber] = useState<number>(0)

  const nextQuestion = () => {
    if (option === "") return alert("Please select an option")
    if (questionNumber !== q.length - 1) {
      setQuestionNumber(questionNumber + 1)
      setOption("")
    }
  }

  const prevQuestion = () => {
    if (option === "") return alert("Please select an option")
    if (questionNumber !== 0) {
      setQuestionNumber(questionNumber - 1)
      setOption("")
    }
  }

  return (
    <div className="App bg-gray-900 container p-8 ">
      <header className="App-header">
        <p className="text-4xl text-gray-900 dark:text-white dark:bg-gray-700 rounded-lg p-4">
          My Level
        </p>
      </header>
      <div>
        <p className="text-sm dark:text-gray-400 py-8">
          In few questions youll know your software seniority level
        </p>
        <div className="flex justify-center">
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Start
            </span>
          </button>
        </div>

        <div>
          <button
            type="button"
            className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
          >
            {questionNumber + 1} / {q.length - 1}
          </button>
        </div>
        <div className="border-2 border-gray-500 rounded-lg">
          <Question
            title={q[questionNumber].title}
            options={q[questionNumber].options}
            selectedOption={option}
            handleChange={function (e): void {
              setOption(e.target.value)
              const optionSelected = q[questionNumber].options.filter(
                (o) => o.answer === e.target.value
              )
              setScore(optionSelected[questionNumber].score)
            }}
          />
        </div>
      </div>
      <div>
        <p>Selected: {option}</p>
        <p>Score: {score}</p>

        <button
          type="button"
          className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Icon description</span>
        </button>
        <button onClick={prevQuestion}>Anterior</button>
        <button onClick={nextQuestion}>Siguiente</button>
      </div>
    </div>
  )
}

export default Popup
