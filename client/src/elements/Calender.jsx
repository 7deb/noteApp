import { useMemo } from 'react';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const Calendar = ({ value, onClick }) => {
  const year = value.getFullYear();
  const month = value.getMonth();

  const days = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const result = [];

    // empty slots before month starts
    for (let i = 0; i < firstDay; i++) {
      result.push(null);
    }

    // month days
    for (let d = 1; d <= daysInMonth; d++) {
      result.push(d);
    }

    return result;
  }, [year, month]);

  return (
    <div className=" w-.5xl rounded-2xl #363636 p-4 shadow-xl">
        
      {/* Month Header */}
      <div className="mb-2 text-center font-semibold white">    
        {value.toLocaleString('default', { month: 'long' })} {year}
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 text-center text-xs text-slate-400">
        {daysOfWeek.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Days */}
      <div className="mt-2 grid grid-cols-7 gap-1">
        {days.map((day, i) => {
          const isToday =
            day &&
            new Date().toDateString() ===
              new Date(year, month, day).toDateString();

          return (
            <button
              key={i}
              disabled={!day}
              onClick={() => day && onClick(new Date(year, month, day))}
              className={`aspect-square rounded-lg text-sm transition
                ${!day ? 'cursor-default' : 'hover:bg-blue-100'}
                ${isToday ? 'bg-blue-500 text-white' : ''}
              `}
            >
              {day || ''}
            </button>
          );
        })}
      </div>
    </div>
  );
};
