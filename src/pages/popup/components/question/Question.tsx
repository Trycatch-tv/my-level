import "./Question.scss";

interface QuestionProps {
  title: string;
  options: any;
  selectedOption: string;
  handleChange: (e: any) => void;
}
const Question = ({
  title,
  options,
  selectedOption,
  handleChange,
}: QuestionProps) => {
  return (
    <div className="question">
      <p>{title}</p>
      {options.map((option: any) => (
        <div key={option.title}>
          <input
            type="radio"
            id={option.answer}
            name={option.title}
            value={option.answer}
            onChange={handleChange}
            checked={selectedOption === option.answer}
          />
          <label htmlFor={option.answer}>
            {option.answer + "-" + option.score}
          </label>
        </div>
      ))}
    </div>
  );
};

export default Question;
