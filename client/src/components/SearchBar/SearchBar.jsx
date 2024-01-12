import styles from './searchBar.module.css'

const SearchBar = ({ handleChange }) => {
  const handleChangeSearch = (event) => {
    handleChange(event.target.value);
  };

  return (
    <div>
      <form >
        <input className={styles.search}
          type="search"
          placeholder='Cerca Pokemon'
          onChange={handleChangeSearch} 
        />
      </form>
    </div>
  );
};

export default SearchBar;

