import React, { useState } from "react";

function App() {
  const [todoText, setTodoText] = useState(""); // form input daki text in state i
  const [todos, setTodos] = useState([]); // listelenen todosların state i

  const handleSubmit = (event) => {
    event.preventDefault(); // prevent default formun defaultu submit ile gonderme islemini durdurur
    if (todoText === "") {
      alert("Please enter a todo");
      return;
    }
    const newTodo = {
      // yeni todolari obje olarak oluşturur
      id: new Date().getTime(),
      isDone: false,
      text: todoText, // assagiya todos.map icinde {item.text} olarak todoText gider
      date: new Date(),
    };
    setTodos([...todos, newTodo]); // yeni todo onceki todos larla beraber setTodos a eklenir. Spread operator
    setTodoText(""); // form input daki text in state i bosaltir. Input icinde yazi kalmaz.
    //console.log(newTodo);
  };

  const changeIsDone = (id) => {
    // eklenmis olan todosların isDone degerini degistiren buttona verilen fonksiyondur.
    //console.log(id);                    // button a tiklandiginda o todo nun id si gelir
    const searchedTodo = todos.find((item) => item.id === id); // item in id si ile button a click oldugunda alinan id ye esit olani todo yu
    const updatedTodo = { ...searchedTodo, isDone: !searchedTodo.isDone }; // bulunan todo nun isDone degerini tersi olarak degistirir.
    // searchedTodo ile bulunan todo nun tum ozellikleri ile yeni bir obje olusturuyoruz
    //...searchedTodo spread operator kullanarak tum ozellikler yeniye gecirilir. Bu yeni obje isDone degeri eskisinin terse cevrili olarak olusur.

    //console.log(updatedTodo);
    //console.log(searchedTodo);
    const filteredTodos = todos.filter((item) => item.id !== id);
    // searchedTodo da id esit olani alip ondan updatedTodo ile yeni bir todo olusturduk. Eski olani todos icinden cikarmak icin
    // filteredTodos ile esit olmayanlarin tumunu cagirip yeni bir dizi olustururuz filtre ederiz.
    // Bylelikle isDone degeri degismemis olan eski todo yu todos dizisinden cikarmis oluruz.
    // Sonrasinda updatedTodo ile yeni olusturulmus obje todos a eklenecek
    setTodos([...filteredTodos, updatedTodo]);
    console.log(filteredTodos);
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
      {todos.lenght <= 0 ? ( // indexi 0 a esit veya kucukse ? () degilse : () yapar.
        <p className="text-center my-5">You don't have any todos</p> // .lenght <= ? ()  : ()    bu if yapisini genelde JSX de kullaniriz
      ) : (
        <>
          {todos.map((item) => {
            // suslu parantez yaparsak return yazariz ve jsx doneriz.    .map(item => ()) bu sekilde yazarsak () kendisi return islemidir
            return (
              <div
                className="alert alert-secondary d-flex justify-content-between align-items-center"
                role="alert"
              >
                {item.text}
                <button
                  onClick={() => changeIsDone(item.id)}
                  className="btn btn-sm btn-secondary"
                >
                  {item.isDone === false ? "Done" : "Undone"}
                </button>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default App;
