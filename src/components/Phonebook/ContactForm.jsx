import { useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './Phonebook.module.css';

const ContactForm = (props) => {
    let [name, setName] = useState('')
    let [number, setNumber] = useState('')
    const handleFormSubmit = event => {
    event.preventDefault();

    setName(name = event.target.name.value);
    setNumber(number = event.target.number.value);

    const { addContact } = props;

    addContact({ id: nanoid(), name, number });
    event.target.reset();
    };

    return (
    <section className={css.contactform__card}>
        <h1 className={css.phonebook__title}>Phonebook</h1>
        <form className={css.form} onSubmit={handleFormSubmit}>
            <label className={css.form__label}>Name</label>
            <input
                className={css.form__input}
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                placeholder="Enter name"
                required
            />
            <label className={css.form__label}>Number</label>
            <input
                className={css.form__input}
                type="tel"
                name="number"
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                placeholder="Enter phone number"
                required
            />
            <button className={css.form__button} type="submit">
                Add contact
            </button>
        </form>
    </section>
);
}

ContactForm.propTypes = {
    addContact: PropTypes.func.isRequired,
};

export default ContactForm
