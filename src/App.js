import React, { useState, useEffect } from "react";
import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";

function App() {
  const [todoText, setTodoText] = useState(""); // form input daki text in state i
  const [todos, setTodos] = useState([]); // listelenen todosların state i
  const [isEdit, setIsEdit] = useState(false); // edit todo yazi icerigi
  const [willUpdateTodo, setWillUpdateTodo] = useState(""); // hangi todo nun update edileceginin id sini tutariz

  useEffect(() => {
    const todosFromLocalStorage = localStorage.getItem("todos"); // localStorage dan todos lari cekiyoruz. key i "todos" degeri string cunku LS string tutar.
    console.log(todosFromLocalStorage); // cosole a bastigimizda null geldigini gorunce alttaki if kosulunu yazdik
    if (todosFromLocalStorage === null) {
      localStorage.setItem("todos", JSON.stringify([])); // eger LS de todos yoksa LS ye bos bir array ekliyoruz.
    } else {
      setTodos(JSON.parse(todosFromLocalStorage)); // eger LS de todos varsa setTodos a LS dekileri atiyoruz. JSON.parse ile stringleri js objeye array e ceviriyoruz.
    }
  }, []);

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

      // ! ----------- EDIT ISLEMI ------------
      setTodos([...filteredTodos, updatedTodo].sort((a, b) => a.id - b.id)); // yeni listeyi set ediyoruz ve sonrasinda id sirasina gore siraladik;
      localStorage.setItem(
        "todos",
        JSON.stringify(
          [...filteredTodos, updatedTodo].sort((a, b) => a.id - b.id)
        )
      ); // LS ye yeni listeyi kaydediyoruz
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
      //console.log(newTodo);
      // ! ----------- EKLEME ISLEMI ------------
      setTodos([...todos, newTodo]); // yeni todo onceki todos larla beraber setTodos a eklenir. Spread operator
      localStorage.setItem("todos", JSON.stringify([...todos, newTodo])); // LS ye yeni todo lar eklenir. Spread operator
      setTodoText(""); // form input daki text in state i bosaltir. Input icinde yazi kalmaz.
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
    // Sonrasinda updatedTodo ile yeni olusturulmus obje, todos a eklenecek.
    // ! ----------- DONE - UNDONE ISLEMI ------------
    setTodos([...filteredTodos, updatedTodo].sort((a, b) => a.id - b.id)); // yeni listeyi set ediyoruz ve sonrasinda id sirasina gore siraladik;
    //console.log(filteredTodos);
    localStorage.setItem(
      "todos",
      JSON.stringify([...filteredTodos, updatedTodo])
    ); // LS ye yeni todo lar eklenir. Spread operator
  };

  const deleteTodo = (id) => {
    // eklenmis olan todosların silinmesini saglayan fonksiyondur.
    //console.log(id);                    // button a tiklandiginda o todo nun id si gelir
    const filteredTodos = todos.filter((item) => item.id !== id);
    // filteredTodos ile esit olmayanlarin tumunu cagirip yeni bir dizi olustururuz filtre ederiz.
    // Bylelikle silinmek istenen todo yu todos dizisinden cikarmis oluruz.
    // ! ----------- SILME ISLEMI ------------
    setTodos([...filteredTodos]);
    // setTodos(filteredTodos);  Boyle de yapilabilir. Spread operator kullanmadan. Ama spread operator kullanmak daha iyi. Cunku daha guvenli.
    //console.log(filteredTodos);
    localStorage.setItem("todos", JSON.stringify([...filteredTodos])); // LS ye yeni todo lar eklenir. Spread operator
  };

  return (
    <div className="container">
      <h1 className="text-center my-5">Todo App</h1>
      <TodoForm
        handleSubmit={handleSubmit}
        todoText={todoText}
        setTodoText={setTodoText}
        isEdit={isEdit}
      />
      {todos.lenght <= 0 ? ( // indexi 0 a esit veya kucukse ? () degilse : () yapar.
        <p className="text-center my-5">You don't have any todos</p> // .lenght <= ? ()  : ()    bu if yapisini genelde JSX de kullaniriz
      ) : (
        <>
          {todos.map(
            (
              item,
              index // altta donerken Todo yu  => () degilde => {} yaparsak return yazmamiz gerekir. coklu yazimda kullaniriz. Cunku {} icindeki hersey birsey dondurur. burada sadece todo donduk
            ) => (
              <div key={index}>
                <Todo
                  item={item}
                  changeIsDone={changeIsDone}
                  deleteTodo={deleteTodo}
                  setIsEdit={setIsEdit}
                  setWillUpdateTodo={setWillUpdateTodo}
                  setTodoText={setTodoText}
                />
              </div>
            )
          )}
        </>
      )}
    </div>
  );
}

export default App;
