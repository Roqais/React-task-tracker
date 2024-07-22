import { FaTimes } from "react-icons/fa"

const Task = ({ task, onDelete, onToggle, showAdd }) => {
    const taskStyle = {
        borderLeft: `4px solid ${showAdd ? 'red' : 'blue'}`,
        borderRight: `4px solid ${showAdd ? 'red' : 'blue'}`,
    }

    return (
        <div
            className="task"
            style={task.reminder ? taskStyle : {}}
            onDoubleClick={() => onToggle(task.id)}
        >            <h3>{task.text} <FaTimes style={{ color: "red", cursor: "pointer" }} onClick={() => onDelete(task.id)} /></h3>
            <p>{task.day}</p>

        </div>
    )
}

export default Task