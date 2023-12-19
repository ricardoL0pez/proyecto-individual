import pikachu from '../assets/img/pikachu-running.gif';


const Loading = () => {
  return (
    <div>
        
      <p>Cargando...</p>
      <img src={pikachu} alt="logo-pokemon" style={{ width: '100px' }} />
    </div>
  );
};

export default Loading;