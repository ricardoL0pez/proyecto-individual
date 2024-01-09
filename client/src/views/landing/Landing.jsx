import styles from './landing.module.css';
import { Link } from 'react-router-dom';
import pikachu from '../../assets/img/pika-pika.gif';
import logo from '../../assets/img/logo.png';

const Landing = () => {
 
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img src={logo} alt="logo-pokemon" className={styles.logo} />
        <div className={styles.btn}>
          <div className={styles.transition}></div>
          <Link to="/home" >
            <img src={pikachu} alt="pikachu" style={{ width: '100px' }}/>
          </Link>
          
        </div>
       
      </div>
    </div>
  );
};

export default Landing;