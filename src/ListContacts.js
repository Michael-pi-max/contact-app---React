import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class ListContacts extends Component {

    state = {
        query: ''
    }

    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired
    }

    updateQuery = (query) => {
        this.setState({
            query: query.trim()
        })
    }

    resetQuery = () => {
        this.setState({
            query: ''
        })
    }

    render() {

        const { contacts, onDeleteContact } = this.props;
        const { query } = this.state;

        let showingContacts
        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i')
            showingContacts = contacts.filter((c) => match.test(c.name))
        } else {
            showingContacts = contacts
        }
        showingContacts.sort(sortBy('name'))
        return (

            <div className="list-contacts">
                <div className="list-contacts-top">
                    <input
                        type="text"
                        className="search-contacts"
                        placeholder="search contacts"
                        value={this.state.query}
                        onChange={(event) => { this.updateQuery(event.target.value) }}
                    />
                    <Link
                        to="/create"
                        className="add-contact">
                        Add Contact
                    </Link>
                </div>
                {showingContacts.length !== contacts.length && (
                    <div className="showing-contacts">
                        <span>Now showing {showingContacts.length} of {contacts.length} total</span>
                        <button onClick={this.resetQuery}>Show all</button>
                    </div>
                )}
                <ol className="contact-list">
                    {showingContacts.map(contact => {
                        return (<li className="contact-list-item">
                            <img className="contact-avatar" src={contact.avatarURL} alt="profile" />
                            <div className="contact-details">
                                <p>{contact.name}</p>
                                <p>{contact.email}</p>
                            </div>
                            <button onClick={() => { onDeleteContact(contact.id) }} className="contact-remove">
                                Remove
                           </button>
                        </li>)
                    })}
                </ol>
            </div>
        )
    }
}


export default ListContacts;