import { useState, useEffect } from "react";
import validation from "./validation";

const Heigth = () => {

    const [userData, setUserData] = useState({
      heigth: 0,
    });
  
    const [errors, setErrors] = useState({});

    const aumentar = (event) => {
      event.preventDefault();
      const currentheigth = Number(userData.heigth);
      if (currentheigth >= 0 && currentheigth < 250) {
        setUserData({ ...userData, heigth: currentheigth + 1 });
      }
    };
  
    const disminuir = (event) => {
      event.preventDefault();
      const currentheigth = Number(userData.heigth);
      if (currentheigth > 1 && currentheigth <= 250) {
        setUserData({ ...userData, heigth: currentheigth - 1 });
      }
    };
  
    const resetear = (event) => {
      event.preventDefault();
      setUserData({ ...userData, heigth: 0 });
    };
  
    const handleChange = (event) => {
      const { name, value } = event.target;
    
      if (name === 'heigth') {
        const parsedValue = parseInt(value);
        const userValidated = validation({ heigth: parsedValue });
    
        setErrors({
          ...errors,
          heigth: userValidated.heigth || '', // Utiliza el mensaje de error validado o establece cadena vacía
        });
    
        if (!userValidated.heigth) {
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
      if (event.key === 'ArrowUp' && userData.heigth < 240) {
        event.preventDefault();
        setUserData({ ...userData, heigth: userData.heigth + 10 });
      } else if (event.key === 'ArrowDown' && userData.heigth >= 10) {
        event.preventDefault();
        setUserData({ ...userData, heigth: userData.heigth - 10 });
      } else if (event.key === 'ArrowDown' && userData.heigth < 10) {
        event.preventDefault(); // Evita el comportamiento predeterminado del navegador para la tecla presionada
        // No se actualiza el estado de userData.heigth si es menor que 10
      }
    };
  
    useEffect(() => {
      if (userData.heigth !== 0) {
        const userValidated = validation(userData);
        setErrors(userValidated);
      }
    }, [userData]);

  return (
    <div>
      <label htmlFor="heigth">Altezza</label>
      <input
        id="heigth"
        placeholder="altezza"
        type="number"
        name="heigth"
        value={userData.heigth}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        min="0"
        max="250"
        step="1"
      />
      <button onClick={aumentar}>▲</button>
      <button onClick={resetear}>○</button>
      <button onClick={disminuir}>▼</button>
      {errors.heigth && <p style={{ color: "red" }}>{errors.heigth}</p>}
    </div>
  );
};

export default Heigth;