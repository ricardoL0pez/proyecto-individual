import styles from './loader.module.css';
import pikachu from '../../../assets/img/pikachu-running.gif';


const Loader = () => {
  return (
    <div className={styles.container}>
        
      <div className={styles.loader}></div>
      <div><img src={pikachu} alt="logo-pokemon" style={{ width: '100px' }} /></div>
      
    </div>
  );
};

export default Loader;