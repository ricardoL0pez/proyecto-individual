
//import styles from './home.module.css';
import pikachu from '../../assets/img/pikachu-roll.gif';
import SearchBar from '../../components/SearchBar/SearchBar';
import Cards from '../../components/cards/cards';
import Paginate from '../../components/paginate/paginate';
import { getAllPokemons, getPokemonByName } from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux"; // Importa los hooks useDispatch y useSelector de React Redux
import { useEffect } from "react"; // Importa el hook useEffect de React

/* const Home = () => {

  const pokemons = useSelector((state) => state.pokemons); // useSelector es un hook que permite seleccionar parte del estado de Redux. Aquí se obtienen los pokemons del estado global.
  const dispatch = useDispatch(); // useDispatch es un hook que devuelve la función dispatch para despachar acciones de Redux.

  const [searchPokemon, setSearchPokemon] = useState("");

  const handleChange = (event) => {
    setSearchPokemon(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getPokemonByName(searchPokemon))

  }

  useEffect(() => { // useEffect es un hook que permite realizar efectos secundarios en componentes funcionales. En este caso, se ejecuta la función cuando el componente se monta, equivalente a componentDidMount en componentes de clase.
    dispatch(getAllPokemons()); // Se dispara la acción getCharacters cuando el componente se monta, para obtener los personajes.
 }, [dispatch]); // El array vacío como segundo argumento significa que este efecto se ejecutará solo una vez, similar a componentDidMount.


  return (
    <>
    <SearchBar handleChange={handleChange} handleSubmit={handleSubmit}/>
    <img src={pikachu} alt="logo-pokemon" style={{ width: '100px' }} />
      <Cards/>
      <Paginate/>
    </>
  );
};

export default Home; */


const Home = () => {
  return (
    <>
    <SearchBar/>
    <img src={pikachu} alt="logo-pokemon" style={{ width: '100px' }} />
      <Cards/>
      <Paginate/>
    </>
  );
};

export default Home;
