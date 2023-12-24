import { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import Paginate from '../../components/paginate/Paginate';
import Loader from '../../utils/loaders/loader-pikachu/Loader';

import { useDispatch, useSelector } from "react-redux"; // Importa los hooks useDispatch y useSelector de React Redux
import { getAllPokemons } from "../../redux/actions/index";
import { Link } from "react-router-dom";

const Home = () => {
  const pokemons = useSelector((state) => state.pokemons);
  const dispatch = useDispatch();
  const [filtered, setFiltered] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    setFiltered(pokemons);
  }, [pokemons]);

  const handleChange = (searchString) => {
    setSearchString(searchString);
    const filteredPokemons = pokemons.filter((p) =>
      p.name.toLowerCase().includes(searchString.toLowerCase())
    );
    setFiltered(filteredPokemons);
    setNoResults(filteredPokemons.length === 0); // Actualiza el estado noResults si no hay resultados
  };

  useEffect(() => {
    dispatch(getAllPokemons())
      .then(() => {
        setIsLoading(false); // Cuando la carga se completa con éxito, se cambia isLoading a false
      })
      .catch((error) => {
        console.error('Error fetching pokemons:', error);
        setIsLoading(false); // En caso de error, también se cambia isLoading a false
      });
  }, [dispatch]);

  return (
    <div>
      <SearchBar handleChange={handleChange} />
      {isLoading && <Loader />}
      {noResults && <p>Boh, non so</p>}
      <Paginate pokemons={filtered} /> {/* Aquí se pasa el estado filtrado */}

      <Link to={"/create"} className="goToCreate">
        <h3>Crea il tuo pokemon</h3>
      </Link>

    </div>
  );
};

export default Home;
