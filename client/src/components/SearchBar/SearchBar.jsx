import styles from './searchBar.module.css'

const SearchBar = ({ handleChange }) => {
  const handleChangeSearch = (event) => {
    handleChange(event.target.value); // Pasar el valor del input al handleChange del componente padre
  };

  return (
    <div>
      <form >
        <input className={styles.search}
          type="search"
          placeholder='Cerca Pokemon'
          onChange={handleChangeSearch} // Llamar a handleChangeSearch en lugar de handleChange
        />
      </form>
    </div>
  );
};

export default SearchBar;

