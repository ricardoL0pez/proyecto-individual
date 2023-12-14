//import styles from './home.module.css';
import pikachu from '../../assets/img/pikachu-roll.gif';
import SearchBar from '../../components/SearchBar/SearchBar';
import Cards from '../../components/cards/cards';
import Paginate from '../../components/paginate/paginate';

const Home = () => {
  return (
    <>
    <SearchBar/>
    <img src={pikachu} alt="logo-pokemon" style={{ width: '100px' }} />
      <Cards/>
      <Paginate/>
    </>
  );
};

export default Home;