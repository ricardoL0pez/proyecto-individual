import styles from './card.module.css'
import { Link } from 'react-router-dom';

const Card = ({ image, id, name, types }) => {

   return (
      <div className={styles.card}>

            <div className={styles.cardimg}>
               <img src={image} alt={name} />
            </div>

            <div className={styles.cardtex}>
               <h1>{id}</h1>
               <h3>{name}</h3>
               <p>Tipi: { // Muestra los tipos del Pokémon, si existen
                  types && types.length > 0
                     ? types.join(", ")
                     : "Nessun tipo"
               }
               </p>
               <Link to={`/home/${id}`}>
                  <h5>Detail</h5>
               </Link>
            </div>        

      </div>
   )
};

export default Card;

