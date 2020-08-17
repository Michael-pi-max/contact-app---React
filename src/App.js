import React, { Component } from 'react';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact';
import { Route } from 'react-router-dom';
import * as ContactApi from './utils/contactsAPI';


class App extends Component {

  componentDidMount() {
    ContactApi.getAll().then((contacts) => {
      this.setState({ contacts })
    })
  }

  state = {
    contacts: []
  }

  removeContact = (contact) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((c) => {
        return c.id !== contact
      })
    }))

    ContactApi.remove(contact)
  }

  createContact(contact) {
    ContactApi.create(contact).then(contact => {
      this.setState(state => (
        { contacts: state.contacts.concat([contact]) }
      ))
    })
  }
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={
          () => (
            <ListContacts
              contacts={this.state.contacts}
              onDeleteContact={this.removeContact}
            />
          )
        } />
        <Route path="/create" render={
          ({history}) => (
            <CreateContact
              onCreateContact={(contact) => {
                this.createContact(contact);
                history.push('/');
              }}
            />
          )
        } />
      </div>
    )
  }
}

export default App;