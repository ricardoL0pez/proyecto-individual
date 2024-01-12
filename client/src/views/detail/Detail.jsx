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
  const { id } = useParams(); 
  const dispatch = useDispatch(); 
  const pokemonDetail = useSelector((state) => state.pokemonDetail); 

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getPokemonId(id));
        setIsLoading(false); 
      } catch (error) {
        console.error('Error fetching pokemons:', error);
        setIsLoading(false); 
      }
    };

    fetchData(); 

    return () => {
      dispatch(cleanDetail()); 
    };
  }, [dispatch, cleanDetail, id, setIsLoading]); 

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
          <p className={styles.ptype}>Tipi: { 
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