//import styles from './cards.module.css'
import Card from "../card/card";
import { getAllPokemons } from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux"; // Importa los hooks useDispatch y useSelector de React Redux
import { useEffect } from "react"; // Importa el hook useEffect de React



const Cards = () => {

   const pokemons = useSelector((state) => state.pokemons); // useSelector es un hook que permite seleccionar parte del estado de Redux. Aquí se obtienen los pokemons del estado global.
   const dispatch = useDispatch(); // useDispatch es un hook que devuelve la función dispatch para despachar acciones de Redux.

   useEffect(() => { // useEffect es un hook que permite realizar efectos secundarios en componentes funcionales. En este caso, se ejecuta la función cuando el componente se monta, equivalente a componentDidMount en componentes de clase.
      dispatch(getAllPokemons()); // Se dispara la acción getCharacters cuando el componente se monta, para obtener los personajes.
   }, []); // El array vacío como segundo argumento significa que este efecto se ejecutará solo una vez, similar a componentDidMount.

   return (
      <div>
         <h1>Cards</h1>
         <div>
            {pokemons.map((pokemon) => { // Mapea los personajes obtenidos del estado y crea un componente Tarjeta para cada uno.
               return <Card
                  key={pokemon.id}
                  id={pokemon.id}
                  name={pokemon.name}
               />;
            })}
         </div>
      </div>
   )
};

export default Cards;