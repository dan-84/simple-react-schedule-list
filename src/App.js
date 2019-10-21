import React, { Component } from 'react';

import  TodoListTemplate  from "./components/TodoListTemplate";
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';
import Palette from './components/Palette';


const colors = ['#343a40', '#f03e3e', '#12b886', '#228ae6'];
class App extends Component {
  id =3;
  state = {
    input:'',
    todos:[
      {id:0,text:'introduce React',checked:false},
      {id:1,text:'introduce Angular',checked:true},
      {id:2,text:'introduce Vuejs',checked:false}
    ],
    color:'#343a40'
  }
  handleChange =(e)=>{
    this.setState({
      input:e.target.value
    })
  }
  handleToggle =(id)=>{
    const {todos} = this.state;

    const index = todos.findIndex(todo=>todo.id === id);
    const selected = todos[index];
    const nextTodos = [...todos];
    nextTodos[index] ={
      ...selected,
      checked:!selected.checked
    };
    this.setState({
      todos:nextTodos
    })
  }
  handleCreate =()=>{
    const {input,todos,color} = this.state;
    this.setState({
      input:'',
      todos:todos.concat({
        id:this.id++,
        text:input,
        checked:false,
        color
      })
    })

  }
  handleKeyPress =(e)=>{
    if(e.key === 'Enter'){
      this.handleCreate();
    }
  }
  handleRemove =(id)=>{
    const {todos} = this.state;
    this.setState({
      todos:todos.filter(todo =>todo.id !==id)
    })
  }
  handleSelect =(color)=>{
    this.setState({
        color
    })
  }
  render() {
    const {input,todos,color} = this.state;
    const {
      handleCreate,
      handleChange,
      handleKeyPress,
      handleToggle,
      handleRemove,
      handleSelect
    } = this;
    return (
      <TodoListTemplate form={(<Form value={input} onKeyPress={handleKeyPress} onChange={handleChange} onCreate={handleCreate} color={color}/>)} 
      palette={(
        <Palette colors={colors} selected={color} onSelect={handleSelect}/>
      )}>
        
        <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove} ></TodoItemList>
      </TodoListTemplate>
    );
  }
}

export default App;
