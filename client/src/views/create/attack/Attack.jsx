import { useState, useEffect } from "react";
import validation from "./validation";

const Attack = () => {

    const [userData, setUserData] = useState({
      attack: 0,
    });
  
    const [errors, setErrors] = useState({});

    const aumentar = (event) => {
      event.preventDefault();
      const currentattack = Number(userData.attack);
      if (currentattack >= 0 && currentattack < 250) {
        setUserData({ ...userData, attack: currentattack + 1 });
      }
    };
  
    const disminuir = (event) => {
      event.preventDefault();
      const currentattack = Number(userData.attack);
      if (currentattack > 1 && currentattack <= 250) {
        setUserData({ ...userData, attack: currentattack - 1 });
      }
    };
  
    const resetear = (event) => {
      event.preventDefault();
      setUserData({ ...userData, attack: 0 });
    };
  
    const handleChange = (event) => {
      const { name, value } = event.target;
    
      if (name === 'attack') {
        const parsedValue = parseInt(value);
        const userValidated = validation({ attack: parsedValue });
    
        setErrors({
          ...errors,
          attack: userValidated.attack || '', // Utiliza el mensaje de error validado o establece cadena vacía
        });
    
        if (!userValidated.attack) {
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
      if (event.key === 'ArrowUp' && userData.attack < 240) {
        event.preventDefault();
        setUserData({ ...userData, attack: userData.attack + 10 });
      } else if (event.key === 'ArrowDown' && userData.attack >= 10) {
        event.preventDefault();
        setUserData({ ...userData, attack: userData.attack - 10 });
      } else if (event.key === 'ArrowDown' && userData.attack < 10) {
        event.preventDefault(); // Evita el comportamiento predeterminado del navegador para la tecla presionada
        // No se actualiza el estado de userData.attack si es menor que 10
      }
    };
  
    useEffect(() => {
      if (userData.attack !== 0) {
        const userValidated = validation(userData);
        setErrors(userValidated);
      }
    }, [userData]);

  return (
    <div>
      <label htmlFor="attack">Attaco</label>
      <input
        id="attack"
        placeholder="attack"
        type="number"
        name="attack"
        value={userData.attack}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        min="0"
        max="250"
        step="1"
      />
      <button onClick={aumentar}>▲</button>
      <button onClick={resetear}>○</button>
      <button onClick={disminuir}>▼</button>
      {errors.attack && <p style={{ color: "red" }}>{errors.attack}</p>}
    </div>
  );
};

export default Attack;