import styles from './card.module.css'
import { Link } from 'react-router-dom';

const Card = ({ image, id, name, types }) => {

   return (

      <div className={styles.container}>

         <div className={styles.card}>

            <div className={styles.cardimg}>
               <img src={image} alt={name} />
            </div>

            <div className={styles.cardtex}>
               
               <div className={styles.div1}><h3>{name}</h3></div>
               <div className={styles.div2}><p>Tipi: {types && types.length > 0
                  ? types.join(", ")
                  : "Nessun tipo"}
               </p></div>
               <div className={styles.div3}><Link to={`/home/${id}`}><h5>Detail</h5></Link></div>

               

               

            </div>

         </div>

      </div>
   )
};

export default Card;

