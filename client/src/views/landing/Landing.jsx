import styles from './landing.module.css';
import { Link } from 'react-router-dom';
import ball from '../../assets/img/ball.gif';
import pikachu from '../../assets/img/pikachu-running.gif';

const Landing = () => {
  return (
    <>
      <h1>Este es el Landing</h1>
      <img
        src={ball}
        alt="ball-image"
        className={styles.ballImage}
        onAnimationEnd={(e) => e.target.style.animationIterationCount = '1'} // Detiene la animación después de una iteración
      />

      <img src={pikachu} alt="logo-pokemon" style={{ width: '100px' }} />
      <Link to="/home">
        <button>Enter</button>
      </Link>
    </>
  );
};

export default Landing;
