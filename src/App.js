import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

import { useState } from 'react';



function App() {

  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Foodball Match',
      day: 'July 23th at 10:00am',
      reminder: false,
    },
    {
      id: 2,
      text: 'Driving Test',
      day: 'July 26th at 5:00pm',
      reminder: true,
    },
    {
      id: 3,
      text: 'Snooker match',
      day: 'July 22th at 2:00pm',
      reminder: true,
    },
  ]);

  const [showAddTask, setShowAddTask] = useState(false)


  // ADD TASK
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 50000) + 1
    const newTask = { id, ...task }
    setTasks([...tasks, newTask])
  }

  // DELETE TASK
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // TOGGLE
  const toggleReminder = (id) => {
    console.log("d", id)
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, reminder: !task.reminder } : task
    ));
  };

  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <>
          <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} showAdd={showAddTask} />
          <p className='container-p'>Double-click to set a reminder</p>
        </>
      ) : (
        "No task available"
      )}

    </div>
  );
}

export default App;
