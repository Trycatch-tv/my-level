import "./Question.scss"

interface QuestionProps {
  title: string
  options: any
  selectedOption: string
  handleChange: (e: any) => void
}
const Question = ({
  title,
  options,
  selectedOption,
  handleChange,
}: QuestionProps) => {
  return (
    <>
      <p className="text-white flex text-sm">{title}</p>
      {options.map((option: any) => (
        <div key={option.title}>
          <div className="flex mb-4 mt-2 w-6/6 ">
            <input
              type="radio"
              className="w-20 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
              id={option.answer}
              name={option.title}
              value={option.answer}
              onChange={handleChange}
              checked={selectedOption === option.answer}
            />
            <label className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              {option.answer}
            </label>
          </div>
        </div>
      ))}
    </>
  )
}

export default Question
