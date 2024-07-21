import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

import { useState, useEffect } from 'react';



function App() {

  const [tasks, setTasks] = useState([])
  const [showAddTask, setShowAddTask] = useState(false)


  useEffect(() => {

    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()

      setTasks(tasksFromServer)
    }

    getTasks()

  }, [])

  // Fetch Tasks Data
  const fetchTasks = async () => {
    const response = await fetch('https://my-json-server.typicode.com/Roqais/task-db/tasks')
    const data = await response.json()

    return data
  }

  // Fetch Task Data
  const fetchTask = async (id) => {
    const response = await fetch(`https://my-json-server.typicode.com/Roqais/task-db/tasks/${id}`)
    const data = await response.json()

    return data
  }


  //Delete Task 
  const deleteTask = async (id) => {

    await fetch(`https://my-json-server.typicode.com/Roqais/task-db/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter((task) => task.id !== id))
  }

  //Toggle 
  const toggleReminder = async (id) => {

    const taskToToggle = await fetchTask(id)

    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`https://my-json-server.typicode.com/Roqais/task-db/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
  }

  // Add Task
  const addTask = async (task) => {

    const res = await fetch('https://my-json-server.typicode.com/Roqais/task-db/tasks', {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks, data])


    // const id = Math.floor(Math.random() * 10000) + 1

    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }

  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : "No task available"}
      <p className='container-p'>Double-click to set a reminder</p>
    </div>
  );
}

export default App;
