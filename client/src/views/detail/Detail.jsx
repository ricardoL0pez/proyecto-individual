import styles from './detail.module.css';
import charmeleon from '../../assets/img/volver.gif';
import Loader from '../../utils/loaders/loader/Loader';
import { Link } from "react-router-dom";
import { getPokemonId, cleanDetail } from "../../redux/actions/index";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

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
    <div>
      {isLoading && <Loader />}
      <img src={pokemonDetail?.image} alt={name} style={{ width: '100px' }} />
      <h2>{pokemonDetail?.name}</h2>
      <p>Hp: {pokemonDetail?.hp}</p>
      <p>Attacco: {pokemonDetail?.attack}</p>
      <p>Difesa: {pokemonDetail?.defense}</p>
      <p>Velocita: {pokemonDetail?.speed}</p>
      <p>Tipi: { // Muestra los tipos del Pokémon, si existen
        pokemonDetail.types && pokemonDetail.types.length > 0
          ? pokemonDetail.types.join(", ")
          : "Nessun tipo"
      }
      </p>
      <p>Altezza: {pokemonDetail?.height}</p>
      <p>Peso: {pokemonDetail?.weight}</p>

      <hr />
      <Link to={"/home"}>
        <img src={charmeleon} alt="charmeleon" style={{ width: '100px' }} />
      </Link>
      <h5>Ritorno</h5>

      


    </div>
  );
};

export default Detail;
