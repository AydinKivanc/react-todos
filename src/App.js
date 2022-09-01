import React, { useState } from "react";

function App() {
  const [todoText, setTodoText] = useState(""); // form input daki text in state i
  const [todos, setTodos] = useState([]); // listelenen todosların state i

  const handleSubmit = (event) => {
    event.preventDefault();              // prevent default formun defaultu submit ile gonderme islemini durdurur
    if (todoText === "") {
      alert("Please enter a todo");
      return;
    }
    const newTodo = {                   // yeni todolari obje olarak oluşturur
      id: new Date().getTime(),
      isDone: false,
      text: todoText,                   // assagiya todos.map icinde {item.text} olarak todoText gider
      date: new Date(),
    };
    setTodos([...todos, newTodo]);      // yeni todo onceki todos larla beraber setTodos a eklenir
    //console.log(newTodo);
    //dasdsadadfsdfs
  };

  return (
    <div className="container">
      <h1 className="text-center my-5">Todo App</h1>
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
            className="btn btn-primary btn-block"
            type="submit" // form icindeki button a submit olarak type verdik.
            id="button-addon2"
          >
            ADD
          </button>
        </div>
      </form>
      {todos.lenght <= 0 ? (             // indexi 0 a esit veya kucukse ? () degilse : () yapar.
        <p className= "text-center my-5">You don't have any todos</p>  // .lenght <= ? ()  : ()    bu if yapisini genelde JSX de kullaniriz
      ) : (
        <>
        {
          todos.map(item => {           // suslu parantez yaparsak return yazariz ve jsx doneriz.    .map(item => ()) bu sekilde yazarsak () kendisi return islemidir 
            return(
              <div className="alert alert-secondary" role="alert">
              {item.text} 
            </div> 
            )
          })
        }
        </>
      )}
    </div>
  );
}

export default App;
