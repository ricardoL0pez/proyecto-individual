import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"; // Importa los hooks useDispatch y useSelector de React Redux
import { Link } from "react-router-dom";
import SearchBar from '../../components/SearchBar/SearchBar';
import Paginate from '../../components/paginate/Paginate';
import Loader from '../../utils/loaders/loader-pikachu/Loader';
import { getAllPokemons, orderByName, filterType, getAllTypes, filterByOrigin } from "../../redux/actions/index";

const Home = () => {
  const [filtered, setFiltered] = useState([]);
  console.log(filtered);
  const [searchString, setSearchString] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);
  const pokemons = useSelector((state) => state.pokemons);
  const types = useSelector((state) => state.types);
  const dispatch = useDispatch();
  const noTypeResults = useSelector((state) => state.noTypeResults);

  useEffect(() => {
    setFiltered(pokemons);
  }, [pokemons]);

  useEffect(() => {
    dispatch(getAllTypes());
  }, [dispatch]);

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

  const handleChange = (searchString) => {
    setSearchString(searchString);
    const filteredPokemons = pokemons.filter((p) =>
      p.name.toLowerCase().includes(searchString.toLowerCase())
    );
    setFiltered(filteredPokemons);
    setNoResults(filteredPokemons.length === 0); // Actualiza el estado noResults si no hay resultados
  };


  const handleOrderBy = (order) => {
    dispatch(orderByName(order));
  };

  const handleFilterType = (event) => {
    const selectedType = event.target.value; // Obtener el valor seleccionado del menú desplegable
    dispatch(filterType(selectedType)); // Despachar la acción filterType con el tipo seleccionado
  }; //al seleccionar un tipo en el menú desplegable, se pasará el valor seleccionado (selectedType) a la acción filterType para filtrar los pokemones según el tipo elegido.

  const handleFilterByOrigin = (selectedOrigin) => {
    dispatch(filterByOrigin(selectedOrigin));
  };


  return (
    <div>
      <SearchBar handleChange={handleChange} />

      <button onClick={() => handleOrderBy('A-Z')}>Ordine A-Z</button>
      <button onClick={() => handleOrderBy('Z-A')}>Ordine Z-A</button>

        <p>Filtra por tipos</p>
      <select onChange={(event) => handleFilterType(event)}>
        <option value="allTypes">Tutti</option>
        {types.map((type, id) => (
          <option key={id} value={type.name}>
            {type.name}
          </option>
        ))}
      </select>

<p>Filtrar por origen</p>
<button onClick={() => handleFilterByOrigin('Bd')}>Base de datos</button>
<button onClick={() => handleFilterByOrigin('Api')}>Api</button>
<button value="allTypes" onClick={(event) => handleFilterType(event)}>Tutti</button>

      {isLoading && <Loader />}
      {noResults && <p>Boh, non so</p>}
      {noTypeResults && <p>Ma dai! No hay Pokémon con este tipo</p>}
      <Paginate pokemons={filtered} /> {/* Aquí se pasa el estado filtrado */}

      <Link to={"/create"} className="goToCreate">
        <h3>Crea il tuo pokemon</h3>
      </Link>
    </div>
  );
};

export default Home;
