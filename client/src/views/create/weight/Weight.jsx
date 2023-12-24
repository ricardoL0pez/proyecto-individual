import { useState, useEffect } from "react";
import validation from "./validation";

const Weight = () => {

    const [userData, setUserData] = useState({
      weight: 0,
    });
  
    const [errors, setErrors] = useState({});

    const aumentar = (event) => {
      event.preventDefault();
      const currentweight = Number(userData.weight);
      if (currentweight >= 0 && currentweight < 250) {
        setUserData({ ...userData, weight: currentweight + 1 });
      }
    };
  
    const disminuir = (event) => {
      event.preventDefault();
      const currentweight = Number(userData.weight);
      if (currentweight > 1 && currentweight <= 250) {
        setUserData({ ...userData, weight: currentweight - 1 });
      }
    };
  
    const resetear = (event) => {
      event.preventDefault();
      setUserData({ ...userData, weight: 0 });
    };
  
    const handleChange = (event) => {
      const { name, value } = event.target;
    
      if (name === 'weigth') {
        const parsedValue = parseInt(value);
        const userValidated = validation({ weigth: parsedValue });
    
        setErrors({
          ...errors,
          weigth: userValidated.weigth || '', // Utiliza el mensaje de error validado o establece cadena vacía
        });
    
        if (!userValidated.weigth) {
          setUserData({
            ...userData,
            [name]: parsedValue,
          });
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
      } else if (event.key === 'ArrowDown' && userData.weight >= 10) {
        event.preventDefault();
        setUserData({ ...userData, weight: userData.weight - 10 });
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
    <div>
      <label htmlFor="weight">Peso</label>
      <input
        id="weight"
        placeholder="peso"
        type="number"
        name="weight"
        value={userData.weight}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        min="0"
        max="250"
        step="1"
      />
      <button onClick={aumentar}>▲</button>
      <button onClick={resetear}>○</button>
      <button onClick={disminuir}>▼</button>
      {errors.weight && <p style={{ color: "red" }}>{errors.weight}</p>}
    </div>
  );
};

export default Weight;