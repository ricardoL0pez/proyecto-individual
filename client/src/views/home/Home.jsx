import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"; // Importa los hooks useDispatch y useSelector de React Redux
import { Link } from "react-router-dom";
import styles from './home.module.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import Paginate from '../../components/paginate/Paginate';
import Loader from '../../utils/loaders/loader-pikachu/Loader';
import { getAllPokemons, orderByName, filterType, getAllTypes, filterByOrigin } from "../../redux/actions/index";
import videoSource from '../../assets/video/home.mp4';

const Home = () => {
  const [filtered, setFiltered] = useState([]);
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
    <div className={styles.container}>
      <video autoPlay loop muted className={styles.video}>
        <source src={videoSource} type="video/mp4" />
      </video>

      <div className={styles.box1}>
        <Paginate pokemons={filtered} /> {/* Aquí se pasa el estado filtrado */}
      </div>



      <div className={styles.box2}>


        <div className={styles.box3}>

          <div className={styles.filtros}>

            {/* Search */}
            <SearchBar handleChange={handleChange} />
            {/* Filtros AZ-ZA */}
            <button className={styles.btn} onClick={() => handleOrderBy('A-Z')}>Ordine A-Z</button>
            <button className={styles.btn} onClick={() => handleOrderBy('Z-A')}>Ordine Z-A</button>
          </div>

          {/* Filtros types */} {/* Filtros origen */}

          <div className={styles.filtros}>


            <select onChange={(event) => handleFilterType(event)}>
              <option value="allTypes">Qualsiasi</option>
              {types.map((type, id) => (
                <option key={id} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
            <button className={styles.btn} onClick={() => handleFilterByOrigin('Bd')}>Creati</button>
            <button className={styles.btn} onClick={() => handleFilterByOrigin('Api')}>Originali</button>
            <button className={styles.btn} value="allTypes" onClick={(event) => handleFilterType(event)}>Tutti</button>
          
          </div>

        </div>

        <div className={styles.box4}>

          <Link to={"/create"} className={styles.containercreator}>
            <div className={styles.pokeball}></div>
            <button className={styles.btncreate}>+</button>
            <h3>Crea il tuo pokemon</h3>
          </Link>

        </div>



      </div>

      {/* Crear pokemon */}







      {isLoading && <Loader />}
      {noResults && <p>Boh, non so</p>}
      {noTypeResults && <p>Ma dai! No hay Pokémon con este tipo</p>}


    </div>
  );
};

export default Home;
