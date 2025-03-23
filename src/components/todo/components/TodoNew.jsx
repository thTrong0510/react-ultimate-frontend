import { useState } from "react";

const TodoNew = ({ addNewTodo }) => {

    const [myText, setMyText] = useState("");

    const handleOnClick = () => {
        addNewTodo(myText)
        setMyText("")
    }

    const handleOnChange = (name) => {
        setMyText(name)
    }

    return (
        <div className="todo-new">
            <input onChange={(event) => handleOnChange(event.target.value)} value={myText} />
            <button style={{ cursor: "pointer" }} onClick={handleOnClick}>add</button>
        </div>
    );
}

export default TodoNew;