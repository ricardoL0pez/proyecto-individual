//import styles from './landing.module.css';
import { Link } from 'react-router-dom';
//import ball from '../../assets/img/ball.gif';
import pikachu from '../../assets/img/pika-pika.gif';

const Landing = () => {
  return (
    <>
      <h1>Este es el Landing</h1>
      {/* <img
        src={ball}
        alt="ball-image"
        className={styles.ballImage}
        onAnimationEnd={(e) => e.target.style.animationIterationCount = '1'} // Detiene la animación después de una iteración
      /> */}

      
      <Link to="/home">
      <img src={pikachu} alt="logo-pokemon" style={{ width: '100px' }} />
        {/* <button>Enter</button> */}
      </Link>
    </>
  );
};

export default Landing;
