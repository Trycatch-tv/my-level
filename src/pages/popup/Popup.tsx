import q from "@assets/data/questions.json"
import "@pages/popup/Popup.css"
import { useEffect, useState } from "react"
import Question from "./components/question/Question"

const Popup = () => {
  const [option, setOption] = useState<string>("")
  const [score, setScore] = useState<number>(0)
  const [isStarted, setIsStarted] = useState<boolean>(false)
  const [questionNumber, setQuestionNumber] = useState<number>(0)
  const [answers, setAnswers] = useState<any>([])
  const [isAnswered, setIsAnswered] = useState<boolean>(false)
  const [isLastQuestion, setIsLastQuestion] = useState<boolean>(false)
  const [isFirstQuestion, setIsFirstQuestion] = useState<boolean>(true)
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

  const handleOptionChange = (e: any) => {
    setOption(e.target.value)
    const optionSelected = q[questionNumber].options.filter(
      (o) => o.answer === e.target.value
    )
    setScore(optionSelected[0].score)
    if (answers[questionNumber]?.length == 0) {
      // Insert new answer
      setAnswers([...answers, optionSelected[0]])
    } else {
      // Update answer
      answers[questionNumber] = optionSelected[0]
      setAnswers(answers)
    }
  }

  useEffect(() => {
    // Check if there is an answer for this question
    if (answers[questionNumber] !== undefined) {
      setOption(answers[questionNumber].answer)
      setScore(answers[questionNumber].score)
      setIsAnswered(true)
    } else {
      setIsAnswered(false)
    }

    // Check if this is the first question
    if (questionNumber === 0) {
      setIsFirstQuestion(true)
    } else {
      setIsFirstQuestion(false)
    }

    // Check if this is the last question
    if (questionNumber === q.length - 1) {
      setIsLastQuestion(true)
    } else {
      setIsLastQuestion(false)
    }
  }, [questionNumber])

  function getLevel(totalScore: number) {
    if (totalScore <= 20) {
      return "Beginner"
    } else if (totalScore <= 25) {
      return "Trainee"
    } else if (totalScore <= 30) {
      return "Junior"
    } else if (totalScore <= 35) {
      return "Junior Advanced"
    } else if (totalScore <= 40) {
      return "Semi Senior"
    } else if (totalScore <= 45) {
      return "Semi Senior Advanced"
    } else if (totalScore <= 50) {
      return "Senior"
    } else if (totalScore <= 55) {
      return "Senior Advanced"
    } else if (totalScore <= 60) {
      return "Tech Lead"
    } else if (totalScore <= 65) {
      return "Senior Tech Lead"
    } else if (totalScore <= 70) {
      return "Engineer Manager"
    } else if (totalScore <= 75) {
      return "Senior Engineer Manager"
    } else if (totalScore <= 80) {
      return "VP"
    } else if (totalScore <= 85) {
      return "Senior VP"
    } else if (totalScore <= 90) {
      return "Executive VP"
    } else if (totalScore <= 95) {
      return "Senior Executive VP"
    } else {
      return "CTO"
    }
  }

  function finishQuiz() {
    const userConfirm = confirm("do you want to finish?")
    if (userConfirm) {
      const totalScore = answers.reduce((acc: any, answer: any) => {
        return acc + answer.score
      }, 0)
      const level: string = getLevel(totalScore)
      alert(`Your level is ${level}`)
      setIsStarted(false)
      setQuestionNumber(0)
      setOption("")
      setScore(0)
      setAnswers([])
      setIsAnswered(false)
      setIsLastQuestion(false)
      setIsFirstQuestion(true)
    }
  }

  return (
    <div className="App bg-gray-900 container p-8">
      <header className="App-header">
        <p className="flex text-4xl text-gray-900 dark:text-white dark:bg-gray-700 rounded-lg p-4">
          <svg
            className="svg-icon fill-gray-500 w-10 h-10 mr-2"
            viewBox="0 0 20 20"
          >
            <path d="M17.431,2.156h-3.715c-0.228,0-0.413,0.186-0.413,0.413v6.973h-2.89V6.687c0-0.229-0.186-0.413-0.413-0.413H6.285c-0.228,0-0.413,0.184-0.413,0.413v6.388H2.569c-0.227,0-0.413,0.187-0.413,0.413v3.942c0,0.228,0.186,0.413,0.413,0.413h14.862c0.228,0,0.413-0.186,0.413-0.413V2.569C17.844,2.342,17.658,2.156,17.431,2.156 M5.872,17.019h-2.89v-3.117h2.89V17.019zM9.587,17.019h-2.89V7.1h2.89V17.019z M13.303,17.019h-2.89v-6.651h2.89V17.019z M17.019,17.019h-2.891V2.982h2.891V17.019z"></path>
          </svg>
          My Level
        </p>
      </header>
      {!isStarted && (
        <div className="w-full h-full overflow-hidden border border-gray-500 rounded-md mt-4 p-4 ">
          <div>
            <p className="text-lg dark:text-gray-400 py-8">
              In few questions youll know your software seniority level
            </p>
            <div className="flex justify-start">
              <button
                onClick={() => setIsStarted(true)}
                className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
              >
                <span className="relative px-24 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Start
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {isStarted && (
        <div className="w-scree h-full overflow-hidden">
          <div className="mb-2">
            <div className="flex justify-between">
              <div className="mt-2 mb-4 px-5 py-2.5 text-center text-sm font-bold text-gray-500 border-gray-500 border rounded-lg w-1/6 h-1/6">
                {questionNumber + 1} / {q.length}
              </div>
              <div
                className={`mt-2 mb-4 px-5 py-2.5 text-center text-sm font-bold w-auto ${
                  isAnswered
                    ? "text-green-400 border-green-400"
                    : "text-gray-500 border-gray-500"
                } border rounded-lg w-1/6 h-1/6`}
              >
                {isAnswered ? "Answered" : "Not Answered"}
              </div>
            </div>
            <div className="border-2 border-gray-500 rounded-lg p-4 h-70">
              <Question
                title={q[questionNumber].title}
                options={q[questionNumber].options}
                selectedOption={option}
                handleChange={handleOptionChange}
              />
            </div>
          </div>
          <div className="w-screen h-full overflow-hidden">
            <div className=" flex justify-around">
              <button
                onClick={prevQuestion}
                className={`${
                  isFirstQuestion ? "hidden" : ""
                } relative justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800`}
              >
                <span className="flex relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  <svg
                    className="fill-white w-5 h-5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                  >
                    <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                  </svg>
                  Prev
                </span>
              </button>
              <button
                onClick={nextQuestion}
                className={`${
                  isLastQuestion ? "hidden" : ""
                } relative justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800`}
              >
                <span className="flex relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Next
                  <svg
                    className="fill-white w-5 h-5 ml-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                  >
                    <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                  </svg>
                </span>
              </button>

              <button
                onClick={finishQuiz}
                className={`${
                  isLastQuestion ? "" : "hidden"
                } relative justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800`}
              >
                <span className="flex relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Finish
                  <svg
                    className="fill-white w-5 h-5 ml-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                  >
                    <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="mt-1 text-center text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700">
        <p className="text-gray-600">Developed by Judlup | TryCatch.tv</p>
      </div>
    </div>
  )
}

export default Popup
