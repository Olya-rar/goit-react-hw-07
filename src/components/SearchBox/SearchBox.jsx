import { useDispatch, useSelector } from 'react-redux';

import { useId } from 'react';

import { setFilter } from '../../redux/filtersSlice';
import { selectFilter } from '../../redux/filterSelectors';

import styles from './SearchBox.module.css';

const SearchBox = () => {
  const searchInput = useId();

  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const getSearchValueHandler = (event) => {
    const action = setFilter(event.target.value);
    dispatch(action);
  };

  return (
    <div className={styles.searchBox}>
      <label className={styles.label} htmlFor={searchInput}>
        Find contact by name
      </label>
      <input
        className={styles.input}
        type='text'
        id={searchInput}
        value={filter}
        onChange={getSearchValueHandler}
      />
    </div>
  );
};

export default SearchBox;