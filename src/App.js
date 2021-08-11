import './App.css';
import Header from './MyComponents/Header';
import { Todos } from './MyComponents/Todos';
import { Footer } from './MyComponents/Footer';
import { AddTodo } from './MyComponents/AddTodo';
import React, { useState,useEffect } from 'react';
import { About } from "./MyComponents/About";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {

  let initTodo;
  if(localStorage.getItem("todos")===null)
  {
    initTodo=[];
  }
  else{
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }
  const onDelete = (todo) => {
    console.log("I am onDelete! for todo", todo);
    // Deleting in this way will not work in react 
    // let index = todos.indexOf(todo);
    // todos.splice(index, 1);

    setTodos(todos.filter((e) => {
      return e !== todo;
    }));
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const addTodo = (title,desc) => {
    console.log("I am adding this todo!",title,desc);
    let sno;
    if(todos.length === 0){
      sno=0;
    }
    else{
      sno = todos[todos.length-1].sno + 1;
    }
    const myTodo = {
      sno:sno,
      title:title,
      desc:desc 
    }
    setTodos([...todos, myTodo]);
    console.log(myTodo);

    // localStorage.setItem("todos",JSON.stringify(todos));
  }

  const [todos, setTodos] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])
  return (
    <>
    <Router>
      <Header title="My Todos List" searchBar={true} />
        <Switch>
          <Route exact path="/" render={()=>{
            return(
              <>
                <AddTodo addTodo={addTodo} />
                <Todos todos={todos} onDelete={onDelete} />
              </>
            )
          }
          }>
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
        </Switch>
      

      <Footer />
      {/* <div>
      <h2>My first React app</h2>
      <p>My app works</p>
     </div> */}
    </Router>
    </>
  );
}

export default App;

/*
{
      sno: 1,
      title: "Go to the market",
      desc: "You need to go to the market to get this job done1!"
    },
    {
      sno: 2,
      title: "Go to the mall",
      desc: "You need to go to the market to get this job done2!"
    },
    {
      sno: 3,
      title: "Go to the ghar",
      desc: "You need to go to the market to get this job done3!"
    }
*/
