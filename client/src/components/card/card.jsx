import styles from './card.module.css'
import { Link } from 'react-router-dom';

const Card = ({ image, id, name, types, showDetailLink }) => {

   return (
      <div className={styles.card}>

         {/* image */}
         <div className={styles.boximage}>
            <img src={image} alt={name} />
         </div>

         {/* text */}
         <div className={styles.boxtext}>
            <div className={styles.name}>{name}</div>


            <div>{types && types.length > 0
               ? types.join(", ")
               : "Nessun tipo"}
            </div>

            {showDetailLink && (  // Condición para mostrar el enlace basada en la prop showDetailLink
          <Link className={styles.link} to={`/home/${id}`}>
            Detail
          </Link>
        )}

            {/* <Link className={styles.link} to={`/home/${id}`}>Detail</Link> */}

         </div>

      </div>


   )
};

export default Card;

