import { useState } from 'react';
import Navbar from '../elements/Navbar';
import { Calendar } from '../elements/Calender';
import Todo from '../elements/Todo';

const Home = () => {
  const [value, onChange] = useState(new Date());

  return (
    <div className="min-h-screen #363636">
      <Navbar />

      {/* Main content */}
      <div className="mx-auto max-w-7xl p-6">
        <div
          className="
            grid
            grid-cols-1
            gap-6
            lg:grid-cols-[320px_1fr]
          "
        >
          {/* LEFT: Todo */}
          <div className="sticky top-24 h-fit">
            <Todo />
          </div>

          {/* RIGHT: Calendar */}
          <div className="rounded-2xl min-h-screen p-6 shadow-xl">
            <Calendar value={value} onClick={onChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
