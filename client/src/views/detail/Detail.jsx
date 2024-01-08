import styles from './detail.module.css';
import charmeleon from '../../assets/img/volver.gif';
import Loader from '../../utils/loaders/loader/Loader';
import { Link } from "react-router-dom";
import { getPokemonId, cleanDetail } from "../../redux/actions/index";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import videoSource from '../../assets/video/detail.mp4';


const Detail = () => {
  const { id } = useParams(); // Obtiene el parámetro 'id' de la URL usando el hook useParams de React Router
  const dispatch = useDispatch(); // Hook useDispatch para despachar acciones de Redux
  const pokemonDetail = useSelector((state) => state.pokemonDetail); // Hook useSelector para obtener parte del estado de Redux

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getPokemonId(id)); // Llama a la acción getPokemonId con el 'id' para obtener los detalles del Pokémon
        setIsLoading(false); // Cuando la carga se completa con éxito, se cambia isLoading a false
      } catch (error) {
        console.error('Error fetching pokemons:', error);
        setIsLoading(false); // En caso de error, también se cambia isLoading a false
      }
    };

    fetchData(); // Llama a la función fetchData para obtener los detalles del Pokémon

    return () => {
      dispatch(cleanDetail()); // Limpia los detalles del Pokémon al desmontar el componente
    };
  }, [dispatch, cleanDetail, id, setIsLoading]); // Ejecuta el efecto al montar el componente y cuando cambien estas dependencias

  return (
    <div className={styles.container}>


      <video autoPlay loop muted className={styles.video}>
        <source src={videoSource} type="video/mp4" />
      </video>

      {isLoading && <Loader />}

      <div className={styles.card}>



        <div className={styles.box}>
          <img src={pokemonDetail?.image} />
        </div>{/* img */}

        <div className={styles.content}>
          <h1>{pokemonDetail?.name}</h1>
          <p className={styles.ptype}>Tipi: { // Muestra los tipos del Pokémon, si existen
            pokemonDetail.types && pokemonDetail.types.length > 0
              ? pokemonDetail.types.join(", ")
              : "Nessun tipo"
          }
          </p>
        </div>{/* content */}

        <div className={styles.footer}>
          <div><p>{pokemonDetail?.hp}<br></br> Hp</p></div>
          <div><p>{pokemonDetail?.attack}<br></br>Attacco</p></div>
          <div><p>{pokemonDetail?.defense}<br></br>Difesa</p></div>
          <div><p>{pokemonDetail?.speed}<br></br>Velocita</p></div>
          <div><p>{pokemonDetail?.height}<br></br>Altezza</p></div>
          <div><p>{pokemonDetail?.weight}<br></br>Peso</p></div>
        </div>{/* footer */}




        {/* Enlace de vuelta */}
         <div className={styles.box5}>
        <Link className={styles.link} to={"/home"}>
          <img src={charmeleon} alt="indietro" style={{ width: '100px' }} />
          <p className={styles.p}>Indietro</p>
        </Link>
      </div> 



      </div> {/* card */}
    </div>
  );
};

export default Detail;
