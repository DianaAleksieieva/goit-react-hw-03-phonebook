import React from 'react';
import { Container} from './App.styled.jsx';
import Form from './Form/Form';
import Filter from './Filter/Filter';
import { v4 as uuidv4 } from 'uuid';
import ContactList from './ContactList/ContactList';

export default class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  }
  componentDidUpdate(preveProps, preveState) {
    if (preveState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }
  componentDidMount() {
    const contacts = localStorage.getItem('contacts')
    const prevContacts = JSON.parse(contacts)
    if (prevContacts) {
      this.setState({contacts: prevContacts})
    }
  }
  addContact = contsctInfo => {
    const newContact = {
      id : uuidv4(),
      name: contsctInfo.name,
      number: contsctInfo.number
    }
    const isNameExist = this.state.contacts.find(({ name }) => contsctInfo.name === name);

    if (isNameExist) {
      alert(`${ contsctInfo.name }is already in contacts`);
    } else {
      this.setState((prevState) => ({
        contacts: [ newContact, ...prevState.contacts ] }));
    }
  
  }
   deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  

changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
};
  findContact = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    const filteredContacts = contacts.filter(contacts =>
      contacts.name.toLowerCase().includes(normalizedFilter),
    );
    return filteredContacts
  };



  render() {
    const { filter,contacts } = this.state;
    const filteredContacts = this.findContact();
    return <Container >
       <h2>PhoneBook</h2>
      <Form onSubmit={this.addContact} contactsBook={contacts} />
      <h2>Contacts</h2>
      
      <ContactList contacts={filteredContacts}  deleteContact={this.deleteContact}/>
      <Filter value={filter} onChange={this.changeFilter} />
    </Container>
  }
}
