//import styles from './searchBar.module.css'

const SearchBar = ({ handleChange, handleSubmit }) => {
   // Declaración de un componente funcional llamado SearchBar que recibe dos props: handleCange y handleSubmit.
 
   return (
     <div>
       <form onChange={handleChange}>
        
         <input type="search" placeholder='Busqueda' />
         {/* Un elemento input que permite a los usuarios ingresar datos con un marcador de posición. El atributo placeholder proporciona un texto de ejemplo que aparece dentro del campo de entrada cuando está vacío. */}
         <button type="submit" onClick={handleSubmit}>Buscar</button>
         {/* se ejecutará la función handleSubmit que se pasa como prop al componente SearchBar. */}
         
       </form>
     </div>
     
   );
 };


export default SearchBar;


/* En resumen, este código define un componente funcional SearchBar que muestra un campo de entrada y un botón. El campo de entrada permite a los usuarios ingresar texto y el botón activa una función llamada handleSubmit cuando se hace clic en él. Sin embargo, hay un error tipográfico en el prop del formulario (handleCange en lugar de handleChange), por lo que se debe corregir para que funcione correctamente. */