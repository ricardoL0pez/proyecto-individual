import charmeleon from '../../assets/img/volver.gif';
import { Link } from "react-router-dom";
import { getPokemonId, cleanDetail } from "../../redux/actions/index";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Detail = () => {
  const { id } = useParams(); // Obtiene el parámetro 'id' de la URL usando el hook useParams de React Router
  const dispatch = useDispatch(); // Hook useDispatch para despachar acciones de Redux
  const pokemonDetail = useSelector((state) => state.pokemonDetail); // Hook useSelector para obtener parte del estado de Redux

  useEffect(() => {
    dispatch(getPokemonId(id)); // Llama a la acción getPokemonId con el 'id' para obtener los detalles del Pokémon
    return () => dispatch(cleanDetail()); // Limpia los detalles del Pokémon al desmontar el componente
  }, []); // Ejecuta el efecto una vez, al montar el componente

  return (
    <>
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
    </>
  );
};

export default Detail;
