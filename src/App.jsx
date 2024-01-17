import './App.css'
import getApi from './hooks/getApi.jsx'
import he from 'he'

function App() {
const api = 'https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple'
const { data, loading, error } = getApi(api)

if (loading) {
  return <p>Loading...</p>;
}

if (error) {
  return <p>Error: {error.message}</p>;
}

console.log(data.results)
  return (
    <>
      {data && (
        <ul>
          {data.results.map((item) => (
            <li key={item.question}>{he.decode(item.question)}</li>
          ))}
        </ul>
      )}
    </>
  )
}

export default App
