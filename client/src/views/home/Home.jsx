import styles from './home.module.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"; // Importa los hooks useDispatch y useSelector de React Redux
import { Link } from "react-router-dom";
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
  // Hooks useSelector y useDispatch para acceder al estado global y despachar acciones
  const pokemons = useSelector((state) => state.pokemons);
  const types = useSelector((state) => state.types);
  const noTypeResults = useSelector((state) => state.noTypeResults);
  const dispatch = useDispatch();// Inicializa el dispatcher para despachar acciones

  useEffect(() => {
    setFiltered(pokemons);
    setNoResults(false); // Al cambiar los pokemons, resetea el estado noResults
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
        {isLoading && <Loader />}
        {noResults && <p style={{ fontSize: '25px'}}>Boh. Nessun risultato.</p>}
        {noTypeResults && <p style={{ fontSize: '25px'}}>Ma dai. Non ci sono Pokemon di questo tipo</p>}
        <Paginate pokemons={filtered} /> {/* Aquí se pasa el estado filtrado */}
      </div>

      <div className={styles.box2}>

        <div className={styles.box3}>
          {/* Search Filtros AZ-ZA*/}
          <div className={styles.filtros}>
            <SearchBar handleChange={handleChange} />
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

            <div className={styles.contenedortext3d}>
              <div className={styles.boxtext3d}>
                <div className={styles.text3d}>- </div>
                <div className={styles.text3d}>C </div>
                <div className={styles.text3d}>r </div>
                <div className={styles.text3d}>e </div>
                <div className={styles.text3d}>a </div>
                <div className={styles.text3d}>- </div>
                <div className={styles.text3d}>i </div>
                <div className={styles.text3d}>l </div>
                <div className={styles.text3d}>- </div>
                <div className={styles.text3d}>t </div>
                <div className={styles.text3d}>u </div>
                <div className={styles.text3d}>o </div>
                <div className={styles.text3d}>- </div>
                <div className={styles.text3d}>P </div>
                <div className={styles.text3d}>o </div>
                <div className={styles.text3d}>k </div>
                <div className={styles.text3d}>e </div>
                <div className={styles.text3d}>m </div>
                <div className={styles.text3d}>o </div>
                <div className={styles.text3d}>n </div>
              </div>
            </div>

            <button className={styles.btncreate}>+</button>
          </Link>







        </div>

      </div>




    </div>
  );
};

export default Home;
