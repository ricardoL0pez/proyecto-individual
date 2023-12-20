import styles from './paginate.module.css'
import Card from "../card/Card"
import { useState } from "react"; 

const Paginate = ({ pokemons }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const previousPage = () => {
    currentPage > 0 ? setCurrentPage(currentPage - 12) : setCurrentPage(currentPage);
  };
  
  const nextPage = () => {
    if (pokemons.length > currentPage + 12) {
      setCurrentPage(currentPage + 12);
    }
  };

  const paginadoPokemons = pokemons.slice(currentPage, currentPage + 12);

  return (
    <div>
      <div className={styles.container}>
        {paginadoPokemons?.map(({ image, id, name, types }) => (
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

export default Paginate;
