import styles from './weight.module.css';
import { useState, useEffect } from "react";
import validation from "./validation";

const Weight = ({ name, value, onChange }) => {

    const [userData, setUserData] = useState({
      weight: value || 0,
    });
  
    const [errors, setErrors] = useState({});

    const aumentar = (event) => {
      event.preventDefault();
      const currentweight = Number(userData.weight);
      if (currentweight >= 0 && currentweight < 250) {
        setUserData({ ...userData, weight: currentweight + 1 });
        onChange(currentweight + 1); // 📌Envía el nuevo valor al componente padre
      }
    };
  
    const disminuir = (event) => {
      event.preventDefault();
      const currentweight = Number(userData.weight);
      if (currentweight > 1 && currentweight <= 250) {
        setUserData({ ...userData, weight: currentweight - 1 });
        onChange(currentweight - 1); // 📌Envía el nuevo valor al componente padre
      }
    };
  
    const resetear = (event) => {
      event.preventDefault();
      setUserData({ ...userData, weight: 0 });
      onChange(0); // 📌Envía el nuevo valor al componente padre
    };
  
    const handleChange = (event) => {
      const { name, value } = event.target;
    
      if (name === 'weight') {
        const parsedValue = parseInt(value);
        const userValidated = validation({ weight: parsedValue });
    
        setErrors({
          ...errors,
          weight: userValidated.weight || '', // Utiliza el mensaje de error validado o establece cadena vacía
        });
    
        if (!userValidated.weight) {
          setUserData({
            ...userData,
            [name]: parsedValue,
          });
          onChange(parsedValue); // 📌Envía el nuevo valor al componente padre
        } else {
          setUserData({
            ...userData,
            [name]: value, // Establece el valor en userData incluso si hay un error para mantener la coherencia
          });
        }
      }
    };
    
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowUp' && userData.weight < 240) {
        event.preventDefault();
        setUserData({ ...userData, weight: userData.weight + 10 });
        onChange(userData.weight + 10); // 📌Envía el nuevo valor al componente padre
      } else if (event.key === 'ArrowDown' && userData.weight >= 10) {
        event.preventDefault();
        setUserData({ ...userData, weight: userData.weight - 10 });
        onChange(userData.weight - 10); // 📌Envía el nuevo valor al componente padre
      } else if (event.key === 'ArrowDown' && userData.weight < 10) {
        event.preventDefault(); // Evita el comportamiento predeterminado del navegador para la tecla presionada
        // No se actualiza el estado de userData.weight si es menor que 10
      }
    };
  
    useEffect(() => {
      if (userData.weight !== 0) {
        const userValidated = validation(userData);
        setErrors(userValidated);
      }
    }, [userData]);

  return (
    <div className= {styles.container}>
      <label className= {styles.label} htmlFor="weight">Peso</label>
      <input className= {styles.input}
        id="weight"
        placeholder="peso"
        type="number"
        name={name} 
        value={userData.weight}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        min="0"
        max="250"
        step="1"
      />
      <div className= {styles.buttons}>
      <button className= {styles.button} onClick={aumentar}>▲</button>
      <button className= {styles.button} onClick={resetear}>○</button>
      <button className= {styles.button} onClick={disminuir}>▼</button>
      </div>

      {errors.weight && <p style={{ color: "red" }}>{errors.weight}</p>}
    </div>
  );
};

export default Weight;