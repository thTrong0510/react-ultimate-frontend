const TodoData = (props) => {
    const { todoList, deleteTodo } = props // destructuring của 1 object

    const handelOnClick = (id) => {
        deleteTodo(id)
    }

    return (
        <div className="todo-data">
            {
                todoList.map((item, index) => {
                    return (
                        <div className="todo-item" key={item.id}>
                            <div>{item.name}</div>
                            <div><button style={{ cursor: "pointer" }} onClick={() => { handelOnClick(item.id) }}>Delete</button></div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default TodoData;