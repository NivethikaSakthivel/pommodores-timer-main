import React, { useEffect } from "react";
// import "./App.css";
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "../utils/axios";
import {useAuth} from '../contexts/AuthContext';


function Todo({ todo, index, markTodo, removeTodo }) {
  return (
    <div
      className="todo"
      
    >
      <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>{todo}</span>
      <div>
        <Button variant="outline-danger" onClick={() => removeTodo(index)}>✕</Button>
      </div>
    </div>
  );
}

function FormTodo({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <Form onSubmit={handleSubmit}> 
    <Form.Group>
      <Form.Label><b>Add Todo</b></Form.Label>
      <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Add new todo" />
    </Form.Group>
    <Button variant="primary mb-3" type="submit">
      Submit
    </Button>
  </Form>
  );
}

function TodoComponent() {
  const {account, isLoggedIn} = useAuth()
  const [todos, setTodos] = React.useState([]);

  const addTodo = text => {
    console.log(text);
    const newTodos = [...todos, text];
    setTodos(newTodos);
    saveTodos(text)
  };

  const markTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    console.log(index)
    deleteTodos(index)
  };

  function saveTodos(text) {
    console.log(text)
    axios
    .post("/todos/save", {
      username: account.username,
      todo: text
    })
    .then(res => console.log(res))
    .catch(err => console.error(err))
  }

  const getTodos = async () => {
    if (isLoggedIn) {
      console.log("made the backend")
      await axios
      .get(`/todos/${account.username}`)
      .then(res => setTodos(res.data))
      .catch(err => console.error(err))
    }
  }

  const deleteTodos = async (index) => {
    if (isLoggedIn) {
      console.log("made the backend")
      await axios
      .put(`/todos/delete/${account.username}`,{
        todo: index
      })
      .then(res => console.log(res.data))
      .catch(err => console.error(err))
    }
  }

  useEffect(() => {
    getTodos()
    console.log(todos)
  }, [])

  return (
    <div className="todo-component">
      <div className="container">
        <FormTodo addTodo={addTodo} />
        <div>
          {todos.map((todo, index) => (
            <Card>
              <Card.Body>
                <Todo
                key={index}
                index={index}
                todo={todo}
                removeTodo={removeTodo}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TodoComponent;
