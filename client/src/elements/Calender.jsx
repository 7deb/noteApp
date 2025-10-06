import { useState } from 'react'
import Calendar from 'react-calendar'

const Calender = () => {
    const [value, onChange] = useState(new Date());
    return (
        <div>
            <Calendar onChange={onChange}  />

        </div>
    )
}

export default Calender
