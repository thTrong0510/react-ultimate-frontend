import { useState } from "react"
import TodoNew from "./TodoNew"
import TodoData from "./TodoData"
import viteLogo from "../../../assets/react.svg"

const ToDoApp = () => {
    const [todoList, setTodoList] = useState([])

    const addNewTodo = (name) => {
        const id = todoList.length + 1;
        const newToDo = { id: id, name: name };
        setTodoList([...todoList, newToDo]);
    }

    const deleteTodo = (id) => {
        setTodoList(todoList.filter(item => item.id != id));
    }

    return (
        <>
            <div className="todo-container">
                <div className="todo-title">To Do List</div>
                <TodoNew addNewTodo={addNewTodo} />
                {
                    (
                        todoList.length > 0 ?
                            <TodoData todoList={todoList} deleteTodo={deleteTodo} /> :
                            <div className="todo-image">
                                <img src={viteLogo} className="logo" alt="Vite logo" />
                            </div>
                    )
                }
            </div>
        </>
    );
}

export default ToDoApp;