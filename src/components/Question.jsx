import getApi from '../hooks/getApi.jsx'
import he from 'he'

function Question( { hide } ) {
const api = 'https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple'
const { data, loading, error } = getApi(api)

if (loading) {
  return <p style={{display: 'none'}}>Loading...</p>;
}

if (error) {
  return <p>Error: {error.message}</p>;
}

function shuffleArray(questions) {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
  return answers(questions)
}

function getQuestionsArray( questionData ) {
  const questionsArr = []
  questionsArr.push(questionData.correct_answer)
  questionData.incorrect_answers.forEach((item) => {
    questionsArr.push(item)
  })
  shuffleArray(questionsArr)
}

function answers( ans ) {
  ans.map((item) => {
    console.log(item)
    return <li key={item}>{he.decode(item)}</li>
  })
}

// const allQuestions = getQuestionsArray()

// console.log(data.results)
  return (
    <div className={hide ? 'hide' : ''}>
      {data && (
        <ul>
          {data.results.map((item) => (
            <>
              <div key={item.question}>{he.decode(item.question)}</div>
              <div>{getQuestionsArray(item)}</div>
            </>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Question
