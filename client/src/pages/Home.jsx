import Calendar from 'react-calendar'
import {useState} from 'react'

const Home = () => {
  const [value, onChange] = useState(new Date());
  return (
    <div>
      <div>
        <Calendar onChange={onChange} />

      </div>
    </div>
  )
}

export default Home
