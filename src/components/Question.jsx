import getApi from '../hooks/getApi.jsx'
import he from 'he'
import { useState } from 'react'

function Question( { hide } ) {
const api = 'https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple'
const { data, loading, error } = getApi(api)
const [ userResponse, setUserResponse ] = useState([])

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
      <div key={item.question} className="card">
        <div>{he.decode(item.question)}</div>
        {ansArr.map((ans, i) => {
          return <button className="btn" key={ans} onClick={()=>collectAns(ans, he.decode(item.correct_answer), i)}>{ans}</button>
        })}
      </div>
      
    )
    
  })

  function collectAns(ans, correct, index) {
    if(userResponse.length === 0) {
      return setUserResponse([{
        correctAnswer: correct,
        userAnswer: ans
      }])
    }

    setUserResponse((prev) => {
      if(prev.correctAnswer === correct) {
        return {
          ...prev,
          userAnswer: ans
        }
      } else {
        return [
          ...prev,
          {
            correctAnswer: correct,
            userAnswer: ans
          }
        ]
      }
    })

    // setUserResponse(prev => {
    //   if (prev.length === 0) {
    //     return prev.push({
    //       correctAnswer: correct,
    //       userAnswer: ans
    //     })
    //   }


      // if(prev.correctAnswer === correct) {
      //     return {
      //       ...prev, 
      //       userAnswer: ans
      //     }
      //   } 


      // return prev.push({
      //   correctAnswer: correct,
      //   userAnswer: ans
      // })

    // })

  }

  console.log(userResponse)

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
