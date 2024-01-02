import styles from './height.module.css';
import { useState, useEffect } from "react";
import validation from "./validation";

const Height = ({ name, value, onChange }) => {

  const [userData, setUserData] = useState({
    height: value || 0, 
  });

  const [errors, setErrors] = useState({});

  const aumentar = (event) => {
    event.preventDefault();
    const currentheight = Number(userData.height);
    if (currentheight >= 0 && currentheight < 250) {
      setUserData({ ...userData, height: currentheight + 1 });
      onChange(currentheight + 1); // 📌Envía el nuevo valor al componente padre
    }
  };

  const disminuir = (event) => {
    event.preventDefault();
    const currentheight = Number(userData.height);
    if (currentheight > 1 && currentheight <= 250) {
      setUserData({ ...userData, height: currentheight - 1 });
      onChange(currentheight - 1); // 📌Envía el nuevo valor al componente padre
    }
  };

  const resetear = (event) => {
    event.preventDefault();
    setUserData({ ...userData, height: 0 });
    onChange(0); // 📌Envía el nuevo valor al componente padre
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'height') {
      const parsedValue = parseInt(value);
      const userValidated = validation({ height: parsedValue });

      setErrors({
        ...errors,
        height: userValidated.height || '', // Utiliza el mensaje de error validado o establece cadena vacía
      });

      if (!userValidated.height) {
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
    if (event.key === 'ArrowUp' && userData.height < 240) {
      event.preventDefault();
      setUserData({ ...userData, height: userData.height + 10 });
      onChange(userData.height + 10); // 📌Envía el nuevo valor al componente padre
    } else if (event.key === 'ArrowDown' && userData.height >= 10) {
      event.preventDefault();
      setUserData({ ...userData, height: userData.height - 10 });
      onChange(userData.height - 10); // 📌Envía el nuevo valor al componente padre
    } else if (event.key === 'ArrowDown' && userData.height < 10) {
      event.preventDefault(); // Evita el comportamiento predeterminado del navegador para la tecla presionada
      // No se actualiza el estado de userData.height si es menor que 10
    }
  };

  useEffect(() => {
    if (userData.height !== 0) {
      const userValidated = validation(userData);
      setErrors(userValidated);
    }
  }, [userData]);

  return (
    <div className= {styles.container}>
      <label className= {styles.label} htmlFor="height">Altezza</label>
      <input className= {styles.input}
        id="height"
        placeholder="height"
        type="number"
        name={name} 
        value={userData.height}
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

      {errors.height && <p style={{ color: "red" }}>{errors.height}</p>}
    </div>
  );
};

export default Height;