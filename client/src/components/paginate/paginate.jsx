import styles from './paginate.module.css'
import Card from "../card/Card"
import { useEffect, useState } from "react";

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

  useEffect(() => {
    setCurrentPage(0)
  }, [pokemons])


  return (
    <div>
      <div className={styles.container}>

        <div className={styles.box}>
          {paginadoPokemons?.map(({ image, id, name, types }) => (
            <Card key={id}
              image={image}
              id={id}
              name={name}
              types={types}
              showDetailLink={true} />))}
        </div>

        <div className={styles.box}>
          <div className={styles.btn}>
            <button onClick={previousPage}>Indietro</button>
            <div className={styles.transitionprev}></div>
          </div>
          <p className={styles.p}>{currentPage / 8 + 1}</p>
          <div className={styles.btn}>
            <button onClick={nextPage}>Avanti</button>
            <div className={styles.transitionnex}></div>
          </div>
        </div>


      </div>


    </div>
  );
};

export default Paginate;
