import React from 'react';
import {Input} from '../App.styled.jsx';
// import { v4 as uuidv4 } from 'uuid';

export default class Form extends React.Component {
  
state = {
  name: '',
  number: ''
  }
  handleChange = event => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value,
      contacts: { [event.currentTarget.name]: event.currentTarget.value}
    })
    
  }
  handleSubmit = event => {
    event.preventDefault()
    this.props.onSubmit(this.state)
    this.reset()
  }
  reset = () => {
    this.setState({name: '', number: ''})
  }
  
  render() {
    return <form onSubmit={this.handleSubmit}>
        <lable> Name
        <Input
        value={this.state.name}
        onChange={this.handleChange}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Имя может состоять только из букв, апострофа, тире и пробелов. 
        Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
        required/> 
      </lable>
      <lable> Number
        <Input
        value={this.state.number}
        onChange={this.handleChange}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, 
        круглые скобки и может начинаться с +" required/> 
        </lable>
        <button type="submit">Add contact</button>
        </form>
  }
  }