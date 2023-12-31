import styles from './landing.module.css';
import { Link } from 'react-router-dom';
import pikachu from '../../assets/img/pika-pika.gif';
import Loader from '../../utils/loaders/loader-pikachu/Loader'

const Landing = () => {
  return (
    <div className={styles.container}>

      <div className={styles.content}>
        
      
       
          
        

         <div href="#0" className={styles.btn}>
        <Link to="/home">
          <img src={pikachu} alt="logo-pokemon" style={{ width: '100px' }} />
        </Link>
          <div className={styles.transition}></div>
        </div> 

      </div>
    </div>
  );
};

export default Landing;
