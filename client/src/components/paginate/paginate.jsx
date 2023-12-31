import styles from './paginate.module.css'
import Card from "../card/Card"
import { useState } from "react";

const Paginate = ({ pokemons }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const previousPage = () => {
    currentPage > 0 ? setCurrentPage(currentPage - 8) : setCurrentPage(currentPage);
  };

  const nextPage = () => {
    if (pokemons.length > currentPage + 8) {
      setCurrentPage(currentPage + 8);
    }
  };

  const paginadoPokemons = pokemons.slice(currentPage, currentPage + 8);

  return (
    <div>
      <div className={styles.container}>
        {paginadoPokemons?.map(({ image, id, name, types }) => (
          <Card key={id} image={image} id={id} name={name} types={types} />
        ))}
      

      <div className={styles.btn}>
        <button onClick={previousPage}>Indietro</button>
        <div className={styles.transitionprev}></div>
      </div>

      <div className={styles.btn}>
        <button onClick={nextPage}>Avanti</button>
        <div className={styles.transitionnex}></div>
      </div>
      </div>


    </div>
  );
};

export default Paginate;
