import React from "react";

const Todo = (props) => {
  const {
    item,
    changeIsDone,
    deleteTodo,
    setIsEdit,
    setWillUpdateTodo,
    setTodoText,
  } = props; // props objesinden item, changeIsDone, deleteTodo, setIsEdit, setWillUpdateTodo, setTodoText propertylerini DISTRUCTRING ile alir.
  return (
    <div
      // className="alert alert-secondary d-flex justify-content-between align-items-center"   Eski hali
      className={`alert alert-${
        item.isDone === true ? "info" : "secondary"
      } d-flex justify-content-between align-items-center`} //string ifade icine js yazmak icin {`$`} kullandik
      role="alert"
    >
      <p>{item.text}</p>
      {/* {isEdit === true ? <input /> : <p>{item.text}</p>} Edit i satirda input acarak yapmaktan vazgectik*/}
      <div>
        <button
          className="btn btn-sm btn-danger"
          // Delete button a tiklandiginda o todo nun id sini alir ve deleteTodo fonksiyonuna gonderir.
          onClick={() => deleteTodo(item.id)}
        >
          Delete
        </button>
        <button
          className="btn btn-sm btn-success mx-1"
          // onClick={() => editTodo(item.id)} // item in id sini button a click oldugunda parametre olarak editTodo functinuna gonderir.
          onClick={() => {
            // edit butonuna tiklandiginda todo nun text i input a yazilir.
            setIsEdit(true);
            setWillUpdateTodo(item.id); //
            setTodoText(item.text);
          }}
        >
          Edit
        </button>
        <button
          onClick={() => changeIsDone(item.id)}
          className="btn btn-sm btn-secondary"
        >
          {item.isDone === false ? "Done" : "Undone"}
        </button>
      </div>
    </div>
  );
};

export default Todo;
