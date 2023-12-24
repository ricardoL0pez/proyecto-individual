import { useState, useEffect } from "react";
import validation from "./validation";

const Speed = () => {

    const [userData, setUserData] = useState({
      speed: 0,
    });
  
    const [errors, setErrors] = useState({});

    const aumentar = (event) => {
      event.preventDefault();
      const currentspeed = Number(userData.speed);
      if (currentspeed >= 0 && currentspeed < 250) {
        setUserData({ ...userData, speed: currentspeed + 1 });
      }
    };
  
    const disminuir = (event) => {
      event.preventDefault();
      const currentspeed = Number(userData.speed);
      if (currentspeed > 1 && currentspeed <= 250) {
        setUserData({ ...userData, speed: currentspeed - 1 });
      }
    };
  
    const resetear = (event) => {
      event.preventDefault();
      setUserData({ ...userData, speed: 0 });
    };
  
    const handleChange = (event) => {
      const { name, value } = event.target;
    
      if (name === 'speed') {
        const parsedValue = parseInt(value);
        const userValidated = validation({ speed: parsedValue });
    
        setErrors({
          ...errors,
          speed: userValidated.speed || '', // Utiliza el mensaje de error validado o establece cadena vacía
        });
    
        if (!userValidated.speed) {
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
      if (event.key === 'ArrowUp' && userData.speed < 240) {
        event.preventDefault();
        setUserData({ ...userData, speed: userData.speed + 10 });
      } else if (event.key === 'ArrowDown' && userData.speed >= 10) {
        event.preventDefault();
        setUserData({ ...userData, speed: userData.speed - 10 });
      } else if (event.key === 'ArrowDown' && userData.speed < 10) {
        event.preventDefault(); // Evita el comportamiento predeterminado del navegador para la tecla presionada
        // No se actualiza el estado de userData.speed si es menor que 10
      }
    };
  
    useEffect(() => {
      if (userData.speed !== 0) {
        const userValidated = validation(userData);
        setErrors(userValidated);
      }
    }, [userData]);

  return (
    <div>
      <label htmlFor="speed">Velocita</label>
      <input
        id="speed"
        placeholder="velocita"
        type="number"
        name="speed"
        value={userData.speed}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        min="0"
        max="250"
        step="1"
      />
      <button onClick={aumentar}>▲</button>
      <button onClick={resetear}>○</button>
      <button onClick={disminuir}>▼</button>
      {errors.speed && <p style={{ color: "red" }}>{errors.speed}</p>}
    </div>
  );
};

export default Speed;