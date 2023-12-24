import React, { useState, useEffect } from "react";
import pikachu from '../../../assets/img/volver.gif';
import Loader from '../../../utils/loaders/loader/Loader';
import Name from '../name/Name';
import Hp from '../hp/Hp';
import Attack from '../attack/Attack';
import Defense from '../defense/Defense';
import Speed from '../speed/Speed';
import Heigth from '../heigth/heigth';
import Weigth from '../weight/Weight';
import Types from '../types/Types';
import { Link } from "react-router-dom";

const Form = () => {
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    name: '',
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    height: '',
    weight: '',
    types: []
  });
console.log(formData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Cambia el estado isLoading a falso inmediatamente
    setIsLoading(false);
  }, []);

  // Función para manejar los cambios en los inputs y actualizar el estado del formulario
  const handleChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();

    // Aquí puedes realizar la validación de formData
    // Por ejemplo, puedes llamar a una función 'validateFormData' que devuelva un objeto de errores
    const errors = validateFormData(formData);

    if (Object.keys(errors).length === 0) {
      // Realiza alguna acción con formData, como enviarla a través de una API o realizar otras operaciones
      // Aquí puedes hacer lo que necesites con los datos válidos
      console.log("Datos válidos:", formData);
    } else {
      // Si hay errores, puedes manejarlos de la manera que desees, como mostrarlos al usuario
      console.log("Errores:", errors);
    }
  };

  return (
    <>
      <h1>Crea il tuo pokemon</h1>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <form onSubmit={handleSubmit}>
            {/* Componentes con sus respectivas propiedades */}
            <Name name='name' value={formData.name} onChange={(value) => handleChange('name', value)} />
            <Hp name='hp' value={formData.hp} onChange={(value) => handleChange('hp', value)} />
            <Attack name='attack' value={formData.attack} onChange={(value) => handleChange('attack', value)} />
            <Defense name='defense' value={formData.defense} onChange={(value) => handleChange('defense', value)} />
            <Speed name='speed' value={formData.speed} onChange={(value) => handleChange('speed', value)} />
            <Heigth name='height' value={formData.height} onChange={(value) => handleChange('height', value)} />
            <Weigth name='weight' value={formData.weight} onChange={(value) => handleChange('weight', value)} />
            <Types name='types' value={formData.types} onChange={(value) => handleChange('types', value)} />
            
            {/* Botón de submit para enviar el formulario */}
            <button type="submit">Crear</button>
          </form>
          
          {/* Enlace de vuelta */}
          <Link to={"/home"} className="backButton">
            <img src={pikachu} alt="logo-pokemon" style={{ width: '100px' }} />
            <h3>Volver</h3>
          </Link>
        </>
      )}
    </>
  );
};

export default Form;


/* el componente Form maneja un único estado (formData) que almacena todos los valores de los campos del formulario. 
Luego, se pasa una función handleChange a los componentes hijos (Name, Hp, Attack, etc.) 
para actualizar este estado cuando ocurren cambios en los inputs. 
Finalmente, al enviar el formulario, se realiza una validación de los datos almacenados en formData 
y se pueden manejar los datos válidos o los errores obtenidos. */