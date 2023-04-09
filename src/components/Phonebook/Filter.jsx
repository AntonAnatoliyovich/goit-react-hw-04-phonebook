import PropTypes from 'prop-types';
import css from './Phonebook.module.css';

const Filter = (props) => {
    const { filter, addFilter } = props;
    return (
        <div className={css.filter}>
            <label className={css.filter__label} htmlFor="">Find contacts by name</label>
            <input
                className={css.filter__input}
                type="text"
                name="filter"
                value={filter}
                onChange={addFilter}
                placeholder="Enter name"
            />
        </div>
    );
}

Filter.propTypes = {
    filter: PropTypes.string.isRequired,
    addFilter: PropTypes.func,
};
export default Filter
