import React, { useState, useEffect } from "react";
import pikachu from '../../../assets/img/volver.gif';
import Loader from '../../../utils/loaders/loader/Loader';
import Name from '../name/Name';
import Hp from '../hp/Hp';
import Attack from '../attack/Attack';
import Defense from '../defense/Defense';
import Speed from '../speed/Speed';
import Height from '../height/Height';
import Weight from '../weight/Weight';
import Types from '../types/Types';
import Image from "./image/Image";
import { createPokemon } from "../../../redux/actions/index";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    height: '',
    weight: '',
    types: [],
    image: ''
  });
console.log(formData);
const [isLoading, setIsLoading] = useState(true);
const [successMessage, setSuccessMessage] = useState('');
const [formValid, setFormValid] = useState(false);
const [formErrors, setFormErrors] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(false);    // Cambia el estado isLoading a falso inmediatamente
  }, []);
// Función para manejar los cambios en los inputs y actualizar el estado del formulario
  const handleChange = (dataName, value) => {
    setFormData({
      ...formData,
      [dataName]: value
    });
  };

  const clearFormData = () => {
    setFormData({
      name: '',
      hp: '',
      attack: '',
      defense: '',
      speed: '',
      height: '',
      weight: '',
      types: [],
      image: ''
    });
  };
  // Función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    // Validar que todos los campos requeridos tengan valores antes de enviar los datos
    const requiredData = ['name', 'hp', 'attack', 'defense', 'speed', 'height', 'weight', 'types', 'image'];
    const missingData = requiredData.filter(data => !formData[data]);
  
    if (missingData.length === 0) {
      dispatch(createPokemon(formData));
      setSuccessMessage('Pokémon creati con successo!');
      console.log("Valid data:", formData);
      clearFormData();
    } else {
      // Si hay campos faltantes, puedes manejarlos de acuerdo a tus necesidades, como mostrar un mensaje al usuario
      console.log("Missing data:", missingData);
      // Por ejemplo, mostrar un mensaje al usuario indicando los campos faltantes
      alert(`Dati obbligatori: ${missingData.join(', ')}`);
    }
  };

  useEffect(() => {
    const requiredData = ['name', 'hp', 'attack', 'defense', 'speed', 'height', 'weight', 'image'];
    const isValid = requiredData.every(data => formData[data]);
    const hasTypes = formData.types.length > 0;


    setFormValid(isValid && hasTypes);
  }, [formData, formErrors]);

  return (
    <>
      <h1>Crea il tuo pokemon</h1>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
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
            <Height name='height' value={formData.height} onChange={(value) => handleChange('height', value)} />
            <Weight name='weight' value={formData.weight} onChange={(value) => handleChange('weight', value)} />
            <Types name='types' value={formData.types} onChange={(value) => handleChange('types', value)} />
            <Image name='types' value={formData.image} onChange={(value) => handleChange('image', value)} />
            
            {/* Botón de submit para enviar el formulario */}
            <button type="submit" disabled={!formValid}>Crear</button>
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