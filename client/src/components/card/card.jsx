//import styles from './card.module.css'
import { Link } from 'react-router-dom';

const Card = ({ id, name }) => {

   return (
      <div>

         <h1>{id}</h1>
         <h3>{name}</h3>
         <Link to={`/home/${id}`}>
            <h5>Detail</h5>
         </Link>

      </div>
   )
};

/* const Card = ({ pokemon }) => {
const {id, name} = pokemon;
   return (
      <div>

         <h1>{name}</h1>
         <Link to={`/home/${id}`}>
            <h1>Detail</h1>
         </Link>

      </div>
   )
}; */

export default Card;

