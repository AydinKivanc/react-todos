import React, { useState } from 'react';

function App() {

  const [todoText, setTodoText] = useState("");


  return (
    <div className="container">
      <h1 className="text-center my-5">Todo App</h1>
      <div class="input-group mb-3">
        <input
          type={todoText}
          class="form-control"
          placeholder="Type your todo"
          onChange={(event) => setTodoText(event.target.value)}     
        />
        <button
          class="btn btn-primary btn-block"
          type="submit"                                             // form icindeki button a submit olarak type verdik.
          id="button-addon2"
        >
          ADD
        </button>
      </div>
    </div>
  );
}

export default App;
