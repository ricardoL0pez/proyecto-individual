//import styles from './home.module.css';
import { useState, useEffect } from 'react';
import pikachu from '../../assets/img/pikachu-roll.gif';
import SearchBar from '../../components/SearchBar/SearchBar';
import Cards from '../../components/cards/Cards';
import { useDispatch, useSelector } from "react-redux"; // Importa los hooks useDispatch y useSelector de React Redux



const Home = () => {
  const pokemons = useSelector((state) => state.pokemons);
  const dispatch = useDispatch();
  const [filtered, setFiltered] = useState([]);
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    setFiltered(pokemons);
  }, [pokemons]);

  const handleChange = (searchString) => {
    setSearchString(searchString);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const filteredPokemons = pokemons.filter((p) =>
      p.name.toLowerCase().includes(searchString.toLowerCase())
    );
    setFiltered(filteredPokemons);
  };

  return (
    <div>
      <SearchBar handleChange={handleChange} handleSubmit={handleSubmit} />
      <img src={pikachu} alt="logo-pokemon" style={{ width: '100px' }} />
      <Cards pokemons={filtered} /> {/* Aquí se pasa el estado filtrado */}
    </div>
  );
};

export default Home;
