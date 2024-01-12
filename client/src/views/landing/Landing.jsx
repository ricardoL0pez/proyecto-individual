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
          <Link to="/home">
            <img
              src={pikachu}
              alt="pikachu"
              style={{ width: '100px', cursor: 'pointer' }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;





/* 
import React, { useState } from 'react';
import styles from './landing.module.css';
import { Link, useHistory } from 'react-router-dom';
import pikachu from '../../assets/img/pika-pika.gif';
import thunder from '../../assets/img/thunder.gif';
import logo from '../../assets/img/logo.png';

const Landing = () => {
  const [showThunder, setShowThunder] = useState(false);
  const [redirectToHome, setRedirectToHome] = useState(false);
  const history = useHistory();

  const handleClick = async () => {
    // Muestra el gif thunder
    setShowThunder(true);

    // Espera 3 segundos usando la función de promesa setTimeout
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Después de 3 segundos, establece el estado para redirigir a la página de inicio
    setRedirectToHome(true);
  };

  // Redirige a la página de inicio después de que se muestra el gif thunder
  if (redirectToHome) {
    history.push('/home');
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img src={logo} alt="logo-pokemon" className={styles.logo} />
        <div className={styles.btn}>
          <div className={styles.transition}></div>
          <Link to="#" onClick={handleClick}>
            <img
              src={pikachu}
              alt="pikachu"
              style={{ width: '100px', cursor: 'pointer' }}
            />
          </Link>

          {showThunder && (
            <div className={styles.thunderContainer}>
              <img src={thunder} alt="thunder" className={styles.thunder} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing;

 */