import { useState, useEffect } from "react";
import validation from "./validation";

const Defense = () => {

    const [userData, setUserData] = useState({
      defense: 0,
    });
  
    const [errors, setErrors] = useState({});

    const aumentar = (event) => {
      event.preventDefault();
      const currentdefense = Number(userData.defense);
      if (currentdefense >= 0 && currentdefense < 250) {
        setUserData({ ...userData, defense: currentdefense + 1 });
      }
    };
  
    const disminuir = (event) => {
      event.preventDefault();
      const currentdefense = Number(userData.defense);
      if (currentdefense > 1 && currentdefense <= 250) {
        setUserData({ ...userData, defense: currentdefense - 1 });
      }
    };
  
    const resetear = (event) => {
      event.preventDefault();
      setUserData({ ...userData, defense: 0 });
    };
  
    const handleChange = (event) => {
      const { name, value } = event.target;
    
      if (name === 'defense') {
        const parsedValue = parseInt(value);
        const userValidated = validation({ defense: parsedValue });
    
        setErrors({
          ...errors,
          defense: userValidated.defense || '', // Utiliza el mensaje de error validado o establece cadena vacía
        });
    
        if (!userValidated.defense) {
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
      if (event.key === 'ArrowUp' && userData.defense < 240) {
        event.preventDefault();
        setUserData({ ...userData, defense: userData.defense + 10 });
      } else if (event.key === 'ArrowDown' && userData.defense >= 10) {
        event.preventDefault();
        setUserData({ ...userData, defense: userData.defense - 10 });
      } else if (event.key === 'ArrowDown' && userData.defense < 10) {
        event.preventDefault(); // Evita el comportamiento predeterminado del navegador para la tecla presionada
        // No se actualiza el estado de userData.defense si es menor que 10
      }
    };
  
    useEffect(() => {
      if (userData.defense !== 0) {
        const userValidated = validation(userData);
        setErrors(userValidated);
      }
    }, [userData]);

  return (
    <div>
      <label htmlFor="defense">Difesa</label>
      <input
        id="defense"
        placeholder="difesa"
        type="number"
        name="defense"
        value={userData.defense}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        min="0"
        max="250"
        step="1"
      />
      <button onClick={aumentar}>▲</button>
      <button onClick={resetear}>○</button>
      <button onClick={disminuir}>▼</button>
      {errors.defense && <p style={{ color: "red" }}>{errors.defense}</p>}
    </div>
  );
};

export default Defense;