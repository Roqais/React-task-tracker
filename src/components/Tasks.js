import Task from './Task'

const Tasks = ({ tasks, onDelete, onToggle, showAdd }) => {
    return (
        <>
            {tasks.map((task) => (
                <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} showAdd={showAdd} />
            ))}
        </>
    )
}

export default Tasks