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

const group =  data.results.map((item) => {
    const ansArr = []
    ansArr.push(he.decode(item.correct_answer))

    item.incorrect_answers.forEach((ans) => {
      ansArr.push(he.decode(ans))
    })

    for (let i = ansArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ansArr[i], ansArr[j]] = [ansArr[j], ansArr[i]];
    }

    return (
      <>
        <div key={item.question}>{he.decode(item.question)}</div>
        {ansArr.map((ans) => {
          return <p key={ans}>{ans}</p>
        })}
      </>
      
    )
    
  })

  return (
    <div className={hide ? 'hide' : ''}>
      {data && (
        <div>
          {group}  
       
        </div>
      )}
    </div>
  )
}

export default Question
