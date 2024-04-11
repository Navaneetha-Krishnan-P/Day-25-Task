
import React, { useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.css"
import { useState } from 'react'
import "./App.css"


const App = () => {

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [todo, setTodo] = useState([])
  const [condition, setCondition] = useState(false)
  const [index, setIndex] = useState(0)
  const [complete, setComplete] = useState('completed')
  const [filteredTodos, setFilteredTodos] = useState([])

  console.log("todo", todo)
  const setStatus = (e, index) => {
    let name = todo[index].name
    let description = todo[index].description
    console.log(e.target.value + index)
    let complete = e.target.value
    const updatedStatus = todo;
    console.log("updatedStatus1", updatedStatus)
    updatedStatus[index] = { name, description, complete }
    console.log("updatedStatus", updatedStatus)
  }

  const addTodo = () => {
    if (name.trim() != '' && description.trim() != '') {
      setTodo([...todo, { name, description, complete }])
      setFilteredTodos([...filteredTodos, { name, description, complete }])
      setName('')
      setDescription('')
      setChange(false)
    }
  }

  const editTodo = (index) => {
    setName(todo[index].name)
    setDescription(todo[index].description)
    setCondition(true)
    setIndex(index)

  }

  const update = () => {
    const updateValues = todo;
    console.log("updateValues", updateValues)
    updateValues[index] = { name, description, complete }
    setTodo(updateValues)
    setFilteredTodos(updateValues)
    setCondition(false)
    setName('')
    setDescription('')
  }

  const deleteTodo = (targetIndex) => {
    const deletedValue = todo.filter((todo, index) => index != targetIndex);
    setTodo(deletedValue)
    setFilteredTodos(deletedValue)
  }

  const statusFilter = (e) => {
    const actualTodo = todo;
    let status = e.target.value;
    console.log(e.target.value)
    console.log("todo", actualTodo)
    if (status != 'all') {
      const completedTodos = actualTodo.filter(todo => todo.complete === status);
      console.log("CompletedTodos", completedTodos)
      setFilteredTodos(completedTodos)
    } else {
      const allTodos = todo
      setFilteredTodos(allTodos)
    }
  }


  return (
    <>
      <h3 className='heading'>My Todo</h3>
      <div className='inputs'>
        <input className="input1" type='text' size={50} placeholder='Todo Name' value={name} onChange={(e) => setName(e.target.value)}></input>&nbsp;
        <input className="input2" type='text' size={50} placeholder='Todo Description' value={description} onChange={(e) => setDescription(e.target.value)}></input>&nbsp;
        {!condition ?
          <button className='btn1' onClick={() => addTodo()}>  Add Todo </button> :
          <button className='btn2' onClick={() => update()}>  Edit Todo</button>
        }
      </div>

      <div className='body'>
        <h3>My Todos</h3>
        <div>
          <label htmlFor="status"><b>Status : </b> &nbsp;</label>
          <select onChange={(e) => statusFilter(e)} name="status" id="status">
            <option className="all" value="all">All</option>
            <option className="completed" value="completed">Completed</option>
            <option className="notCompleted" value="notCompleted">Not Completed</option>
          </select>
        </div>

      </div>
      <div className='cardcont'>
        {filteredTodos.map((todo, index) => (
          <div key={index} className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <p className="card-title"><b>Name : </b>{todo.name}</p>
              <p className="card-text"><b>Description : </b>{todo.description}</p>
              <label htmlFor="status"><b>Status : &nbsp;</b></label>
              <select onChange={(e) => setStatus(e, index)} name="status" id="status">
                <option value="completed" selected={todo.complete === 'completed'}>Completed</option>
                <option value="notCompleted" selected={todo.complete !== 'completed'}>Not Completed</option>
              </select><br /><br />
              <div className='btns'>
                <button className="btn3" onClick={() => editTodo(index)}>Edit</button>&nbsp;&nbsp;
                <button className="btn4" onClick={() => deleteTodo(index)}> Delete</button>
              </div>
            </div>
          </div>
        ))
        }
      </div>
    </>

  )
}

export default App

