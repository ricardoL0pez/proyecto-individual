import styles from './form.module.css';
import React, { useState, useEffect } from "react";
import pikachu from '../../../assets/img/volver.gif';
import logo from '../../../assets/img/logo.png';
import Loader from '../../../utils/loaders/loader/Loader';
import Name from '../name/Name';
import Hp from '../hp/Hp';
import Attack from '../attack/Attack';
import Defense from '../defense/Defense';
import Speed from '../speed/Speed';
import Height from '../height/Height';
import Weight from '../weight/Weight';
import Types from '../types/Types';
import Image from "../image/Image";
import { createPokemon } from "../../../redux/actions/index";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import videoSource from '../../../assets/video/create.mp4';
import Card from '../../../components/card/Card';

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

  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [formValid, setFormValid] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const dispatch = useDispatch();

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

  const handleSubmit = (event) => {
    event.preventDefault();

    const requiredData = ['name', 'hp', 'attack', 'defense', 'speed', 'height', 'weight', 'types', 'image'];
    const missingData = requiredData.filter(data => !formData[data]);

    if (missingData.length === 0) {
      dispatch(createPokemon(formData)); // Crea un nuevo Pokémon enviando los datos al store mediante una acción
      setSuccessMessage('Pokémon creati con successo!'); // Establece un mensaje de éxito
      console.log("Valid data:", formData); // Muestra en consola los datos válidos del formulario
      clearFormData(); // Limpia los datos del formulario

    } else { // Si hay campos faltantes:
      console.log("Missing data:", missingData); // Muestra en consola los campos faltantes
      alert(`Dati obbligatori: ${missingData.join(', ')}`); // Muestra una alerta con los campos faltantes
    }
  };


  useEffect(() => {
    setIsLoading(false);
  }, []);


useEffect(() => {
     const requiredData = ['name', 'hp', 'attack', 'defense', 'speed', 'height', 'weight', 'image'];
     const isValid = requiredData.every(data => formData[data]);   
     const hasTypes = formData.types !== null && formData.types !== undefined && formData.types.length > 0;
       setFormValid(isValid && hasTypes);    
   }, [formData, formErrors]);

  
  return (
    <>

      <div className={styles.navbar}>
        <div className={styles.navbarContent}>
          <Link to="/home">
            <img src={logo} alt="logo-pokemon" style={{ width: '100px' }} />
          </Link>
        </div>

      </div>

      <div className={styles.container}>

        <video autoPlay loop muted className={styles.video}>
          <source src={videoSource} type="video/mp4" />
        </video>

        <div className={styles.box1}>
          <h1>Crea il tuo pokemon</h1>
          {isLoading && <Loader />}
          {!isLoading && (

            <form onSubmit={handleSubmit}>
              <Name name='name' value={formData.name} onChange={(value) => handleChange('name', value)} />
              <br />
              <Hp name='hp' value={formData.hp} onChange={(value) => handleChange('hp', value)} />
              <Attack name='attack' value={formData.attack} onChange={(value) => handleChange('attack', value)} />
              <Defense name='defense' value={formData.defense} onChange={(value) => handleChange('defense', value)} />
              <Speed name='speed' value={formData.speed} onChange={(value) => handleChange('speed', value)} />
              <Height name='height' value={formData.height} onChange={(value) => handleChange('height', value)} />
              <Weight name='weight' value={formData.weight} onChange={(value) => handleChange('weight', value)} />
              <Types name='types' value={formData.types} onChange={(value) => handleChange('types', value)} />
              <Image name='types' value={formData.image} onChange={(value) => handleChange('image', value)} />

              <button className={`${styles.btncreate} ${formValid ? styles.btnValid : ''}`}
                type="submit"
                disabled={!formValid}>+</button>

              


              <p>Creare</p>

            </form>

          )}
        </div>

        <div className={styles.box2}>

          <div className={styles.box3}>
            <Card
              name={formData.name}
              types={formData.types}
              image={formData.image}
              showDetailLink={false}
            ></Card>
            <div>
              <br />
              <p>Hp:{formData.hp}</p>
              <p>Attacco:{formData.attack}</p>
              <p>Difesa:{formData.defense}</p>
              <p>Velocita:{formData.speed}</p>
              <p>Altezza:{formData.height}</p>
              <p>Peso:{formData.weight}</p>
            </div>
            {successMessage && <p style={{ color: 'green', marginTop: '20px' }}>{successMessage}</p>}
          </div>

          <div className={styles.box4}>

            {/* Enlace de vuelta */}
            <div className={styles.box5}>
              <Link className={styles.link} to={"/home"}>
                <img src={pikachu} alt="logo-pokemon" style={{ width: '100px' }} />
                <p className={styles.p}>Indietro</p>
              </Link>
            </div>

          </div>

        </div>

      </div>{/* container */}
    </>
  );
};

export default Form;