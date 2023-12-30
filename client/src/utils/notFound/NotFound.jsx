import React from 'react';
import styles from './notFound.module.css';
import pixelart from '../../assets/img/pokeballpixelart.png';

function NotFound() {
  return (

    <div className={styles.container}>
      <div className={styles.content}>
        <img src={pixelart} alt="pixelart" style={{ width: '50px' }} />
        <h1>Page Not Found - Error 404</h1>
      </div>


    </div>

  )
}

export default NotFound;
