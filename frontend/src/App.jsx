import { useState } from 'react'
import axios from 'axios'

import Navbar from './components/navbar'
import ChatWindow from './components/chat-window'

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [audioFile, setAudioFile] = useState(null)

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/speech-to-text')
      console.log(response.data.text)
      setData(response.data.text)
      setLoading(false)

    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <div className='flex flex-col gap-[5vh] h-screen'>

      <Navbar/>

      <ChatWindow/>

    </div>
  )
}

export default App
