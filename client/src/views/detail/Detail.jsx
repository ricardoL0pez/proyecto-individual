//import styles from './detail.module.css'
import pikachu from '../../assets/img/volver.gif';
import { Link } from "react-router-dom";

const Detail = () => {
  return (
    <>
      <h1>Este es el Detail</h1>
      <Link to={"/home"} className="backButton">
      <img src={pikachu} alt="logo-pokemon" style={{ width: '100px' }} />
      </Link>
      <h3>Volver</h3>
    </>
  );
};

export default Detail;


