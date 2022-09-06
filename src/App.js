import React, { useState } from "react";

function App() {
  const [todoText, setTodoText] = useState(""); // form input daki text in state i
  const [todos, setTodos] = useState([]); // listelenen todosların state i
  const [isEdit, setIsEdit] = useState(false); // edit todo yazi icerigi
  const [willUpdateTodo, setWillUpdateTodo] = useState(""); // hangi todo nun update edileceginin id sini tutariz

  const handleSubmit = (event) => {
    event.preventDefault(); // prevent default formun defaultu submit ile gonderme islemini durdurur
    if (todoText === "") {
      alert("Please enter a todo");
      return;
    }
    const hasTodo = todos.find((todo) => todo.text === todoText);
    console.log(hasTodo); // hasTodo yu console a yazdirdigimizda undefined doner.
    if (hasTodo !== undefined) {
      // Bizde bu undefined yazi durumunu if ile degistirdik.
      alert("This todo already exists");
      return;
    }

    if (isEdit === true) {
      console.log(willUpdateTodo, "todo yu guncelleyecegiz");
      const searchedTodo = todos.find((item) => item.id === willUpdateTodo); // itemleri geziyor ve willUpdateTodo nun id sine esit olan item i buluyor
      const updatedTodo = { ...searchedTodo, text: todoText }; //  ustsatirda bulunan item (searchedTodo) nun ...searchedTodo ile tum ozellikler getirilip, text i todoText e esit olacak sekilde yeni bir obje olusturuyoruz
      const filteredTodos = todos.filter((item) => item.id !== willUpdateTodo); // willUpdateTodo nun id sine esit olmayan item leri filtreliyoruz. Yeni sini 1 us satirda olusturduk eskisini bu satirda cikarip yeni listeyi donuyoruz.
      setTodos([...filteredTodos, updatedTodo].sort((a, b) => a.id - b.id)); // yeni listeyi set ediyoruz ve sonrasinda id sirasina gore siraladik;
      setTodoText(""); // inputu temizliyoruz
      setIsEdit(false); // edit durumunu false yapiyoruz
      setWillUpdateTodo(""); // willUpdateTodo nun id sini temizliyoruz
    } else {
      const newTodo = {
        // yeni todolari obje olarak oluşturur
        id: new Date().getTime(), // benzersiz id olusturma metodu yontemi
        isDone: false,
        text: todoText, // assagiya todos.map icinde {item.text} olarak todoText gider
        date: new Date(),
      };
      setTodos([...todos, newTodo]); // yeni todo onceki todos larla beraber setTodos a eklenir. Spread operator
      setTodoText(""); // form input daki text in state i bosaltir. Input icinde yazi kalmaz.
      //console.log(newTodo);
    }
  };

  const changeIsDone = (id) => {
    // eklenmis olan todosların isDone degerini degistiren buttona verilen fonksiyondur.
    //console.log(id);                    // button a tiklandiginda o todo nun id si gelir
    const searchedTodo = todos.find((item) => item.id === id); // item in id si ile button a click oldugunda alinan id ye esit olani todo dan yeni bir obje olusturduk (searchedTodo)
    const updatedTodo = { ...searchedTodo, isDone: !searchedTodo.isDone }; // bulunan todo nun isDone degerini tersi olarak degistirir.
    //...searchedTodo spread operator kullanarak yeni obje olan searchedTodo nun tum ozellikleri updatedTodo olarak olusturdugumuz yeni objeye gecirilir.
    // ve Bu yeni obje isDone degeri eskisinin terse cevrili olarak olusur.

    //console.log(updatedTodo);
    //console.log(searchedTodo);
    const filteredTodos = todos.filter((item) => item.id !== id);
    // searchedTodo da id esit olani alip ondan updatedTodo ile yeni bir todo olusturduk. Eski olani todos icinden cikarmak icin
    // filteredTodos ile esit olmayanlarin tumunu cagirip yeni bir dizi olustururuz filtre ederiz.
    // Bylelikle isDone degeri degismemis olan eski todo yu todos dizisinden cikarmis oluruz.
    // Sonrasinda updatedTodo ile yeni olusturulmus obje todos a eklenecek.
    setTodos([updatedTodo, ...filteredTodos]);
    console.log(filteredTodos);
  };

  const deleteTodo = (id) => {
    // eklenmis olan todosların silinmesini saglayan fonksiyondur.
    //console.log(id);                    // button a tiklandiginda o todo nun id si gelir
    const filteredTodos = todos.filter((item) => item.id !== id);
    // filteredTodos ile esit olmayanlarin tumunu cagirip yeni bir dizi olustururuz filtre ederiz.
    // Bylelikle silinmek istenen todo yu todos dizisinden cikarmis oluruz.
    setTodos([...filteredTodos]);
    // setTodos(filteredTodos);  Boyle de yapilabilir. Spread operator kullanmadan. Ama spread operator kullanmak daha iyi. Cunku daha guvenli.
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
      {todos.lenght <= 0 ? ( // indexi 0 a esit veya kucukse ? () degilse : () yapar.
        <p className="text-center my-5">You don't have any todos</p> // .lenght <= ? ()  : ()    bu if yapisini genelde JSX de kullaniriz
      ) : (
        <>
          {todos.map((item) => {
            // suslu parantez yaparsak return yazariz ve jsx doneriz.    .map(item => ()) bu sekilde yazarsak () kendisi return islemidir
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
          })}
        </>
      )}
    </div>
  );
}

export default App;
