import { useState, useEffect } from "react";
import { ContactForm } from "./Phonebook/ContactForm";
import { ContactList } from "./Phonebook/ContactList";
import { Filter } from "./Phonebook/Filter";
import css from './Phonebook/Phonebook.module.css';

const App = () =>  {
  let [contacts, setContacts] = useState([]);
  let [filter, setFilter] = useState('');
  const localStorageKey = 'addedContacts';
  let contactsArray = [];

  useEffect(() => {
    const contactsArray = JSON.parse(localStorage.getItem(localStorageKey)) || []
    if(contactsArray.length > 0) {
      setContacts([...contactsArray])
    }
  }, [])

  const addContact = event => {
    contactsArray = JSON.parse(localStorage.getItem(localStorageKey)) || []
    const loweredCase = event.name.toLowerCase().trim();

    const exists = contacts.some(
      contact => contact.name.toLowerCase().trim() === loweredCase
    );

    if (exists) {
      alert(`${event.name} is already in contacts!`);
    } else {
      contactsArray.push(event)
      localStorage.setItem(localStorageKey, JSON.stringify(contactsArray))
      setContacts(contacts = [...contacts, event])
    }
  };

  const addFilter = event => {
    setFilter( filter = event.currentTarget.value )
  };

  const filteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = id => {
    contactsArray = contactsArray.filter(contact => contact.id !== id)
    localStorage.setItem(localStorageKey, JSON.stringify(contactsArray))
    setContacts(contacts = contacts.filter(contact => contact.id !== id))
  }

  return (
    <section>
      <div className={css.phonebook__card}>
        <ContactForm addContact={addContact} />
        <ContactList
          contacts={filteredContacts()}
          deleteContact={deleteContact}
        >
          <Filter filter={filter} addFilter={addFilter} />
        </ContactList>
      </div>
    </section>
  );
}

export default App
