import styles from './home.module.css';
import logo from '../../assets/img/logo.png';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from '../../components/SearchBar/SearchBar';
import Paginate from '../../components/paginate/Paginate';
import Loader from '../../utils/loaders/loader-pikachu/Loader';
import { getAllPokemons, orderByName, filterType, getAllTypes, filterByOrigin, filterByAttack } from "../../redux/actions/index";
import videoSource from '../../assets/video/home.mp4';

const Home = () => {
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);
  const [errorFetching, setErrorFetching] = useState(false);

  /* Selectores */
  const pokemons = useSelector((state) => state.pokemons);
  const types = useSelector((state) => state.types);
  const noTypeResults = useSelector((state) => state.noTypeResults);
  const dispatch = useDispatch();

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

  useEffect(() => {
    setFiltered(pokemons);
    setNoResults(false);
  }, [pokemons]);

  const handleChange = (search) => {
    setSearch(search);
    const filteredPokemons = pokemons.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(filteredPokemons);
    setNoResults(filteredPokemons.length === 0);
  };

  const handleAllPokemons = () => {
    setIsLoading(true);
    dispatch(getAllPokemons())
      .then(() => {
        setIsLoading(false);
        setErrorFetching(false);
      })
      .catch((error) => {
        console.error('Error fetching pokemons:', error);
        setIsLoading(true);
        setErrorFetching(true);
      });
  };

  const handleOrderByName = (order) => {
    dispatch(orderByName(order));
  };

  const handleFilterByOrigin = (selectedOrigin) => {
    dispatch(filterByOrigin(selectedOrigin));
  };

  const handleFilterByAttack = (selectedAttack) => {
    dispatch(filterByAttack(selectedAttack));
  };

  const handleFilterType = (event) => {
    const selectedType = event.target.value;
    dispatch(filterType(selectedType));
  }; 

  return (

    <>

      <div className={styles.navbar}>
        <div className={styles.navbarContent}>
          <Link to="/home">
            <img className={styles.logo} src={logo} alt="logo-pokemon" style={{ width: '100px' }} />
          </Link>
          <SearchBar handleChange={handleChange} />
        </div>

      </div>

      <div className={styles.container}>
        <video autoPlay loop muted className={styles.video}>
          <source src={videoSource} type="video/mp4" />
        </video>

        <div className={styles.box1}>
          {isLoading && <Loader />}
          {noResults && <p style={{ fontSize: '25px' }}>Boh. Nessun risultato.</p>}
          {noTypeResults && <p style={{ fontSize: '25px' }}>Ma dai. Non ci sono Pokemon di questo tipo</p>}
          {errorFetching && <p style={{ fontSize: '25px' }}>Che palle! Errore di recupero</p>}
          <Paginate pokemons={filtered} />
        </div>{/* box1 */}

        <div className={styles.box2}>

          <div className={styles.box3}>

            <div className={styles.filtros}>

              <button className={styles.btn} onClick={() => handleOrderByName('A-Z')}>Ordine A-Z</button>
              <button className={styles.btn} onClick={() => handleOrderByName('Z-A')}>Ordine Z-A</button>
              <button className={styles.btn} onClick={() => handleFilterByAttack('Piu+')}>Attacco +</button>
              <button className={styles.btn} onClick={() => handleFilterByAttack('Piu-')}>Attacco -</button>
            </div>

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

              <button className={styles.btn} onClick={() => handleAllPokemons()}>Tutti</button>

            </div>

          </div>{/* box3 */}

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

          </div>{/* box4 */}

        </div>{/* box2 */}

      </div>{/* container */}
    </>
  );
};

export default Home;