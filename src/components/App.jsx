import { useState, useEffect } from "react";
import ContactForm from "./Phonebook/ContactForm";
import { ContactList } from "./Phonebook/ContactList";
import Filter from "./Phonebook/Filter";
import css from './Phonebook/Phonebook.module.css';

const App = () =>  {
  let [contacts, setContacts] = useState([]);
  let [filter, setFilter] = useState('');
  const localStorageKey = 'addedContacts';

  useEffect(() => {
    let contacts = JSON.parse(localStorage.getItem(localStorageKey)) || []
    if(contacts.length > 0) {
      setContacts([...contacts])
    }
  }, [])

  const addContact = event => {
    setContacts(JSON.parse(localStorage.getItem(localStorageKey)) || [])
    const loweredCase = event.name.toLowerCase().trim();

    const exists = contacts.some(
      contact => contact.name.toLowerCase().trim() === loweredCase
    );

    if (exists) {
      alert(`${event.name} is already in contacts!`);
    } else {
      setContacts(contacts = [...contacts, event])
      localStorage.setItem(localStorageKey, JSON.stringify(contacts))
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
    setContacts(contacts = contacts.filter(contact => contact.id !== id))
    localStorage.setItem(localStorageKey, JSON.stringify(contacts))
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
