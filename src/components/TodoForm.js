import React from "react";

const TodoForm = (props) => {
  const { handleSubmit, todoText, setTodoText, isEdit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group mb-3">
        <input
          value={todoText}
          type="text"
          className="form-control"
          placeholder="Type your todo"
          onChange={(event) => setTodoText(event.target.value)}
        />
        <button
          className={`btn btn-${
            isEdit === true ? "success" : "primary"
          } btn-block`}
          type="submit" // form icindeki button a submit olarak type verdik.
          id="button-addon2"
        >
          {isEdit === true ? "Save" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
