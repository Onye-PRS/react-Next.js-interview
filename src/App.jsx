import { useState } from 'react'
import {Calendar} from './calendar/Calendar.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">

      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <Calendar />
    </div>
  )
}

export default App
