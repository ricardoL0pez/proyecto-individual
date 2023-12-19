import styles from './cards.module.css'
import Card from "../card/Card"
import Loading from '../Loading';
import { getAllPokemons } from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux"; // Importa los hooks useDispatch y useSelector de React Redux
import { useEffect, useState } from "react"; // Importa el hook useEffect de React


const Cards = () => {

  const pokemons = useSelector((state) => state.pokemons); // useSelector es un hook que permite seleccionar parte del estado de Redux. Aquí se obtienen los pokemons del estado global.
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  
  useEffect(() => { // useEffect es un hook que permite realizar efectos secundarios en componentes funcionales. En este caso, se ejecuta la función cuando el componente se monta, equivalente a componentDidMount en componentes de clase.
    const fetchData = async () => {
      try {
        await dispatch(getAllPokemons()); // Se dispara la acción getCharacters cuando el componente se monta, para obtener los personajes.
        setIsLoading(false); // Una vez que se completa la carga, se establece isLoading a false
      } catch (error) {
        console.error('Error fetching pokemons:', error);
        setIsLoading(false); // En caso de error, también se establece isLoading a false
      }
    };

    fetchData();
  }, [dispatch]); // El array vacío como segundo argumento significa que este efecto se ejecutará solo una vez, similar a componentDidMount

  
  //Paginado
  const previousPage = () => {
    currentPage > 1 ? setCurrentPage(currentPage - 12) : setCurrentPage(currentPage);
  };
  
  const nextPage = () => {
    if (pokemons.length > currentPage + 12)
    setCurrentPage(currentPage + 12)
};


 const paginadoPokemons = pokemons.slice(currentPage, currentPage + 12);
  

  return (
    <div>

      {isLoading && <Loading />}
      <div className={styles.container}>
        {paginadoPokemons?.map(({ image, id, name, types }) => ( // Mapea los personajes obtenidos del estado y crea un componente Tarjeta para cada uno.
          <Card key={id} image={image} id={id} name={name} types={types} />
        ))}
      </div>

      <button onClick={previousPage}>
        Indietro
      </button>
      <button onClick={nextPage}>
        Avanti
      </button>
    </div>
  );
};

export default Cards;