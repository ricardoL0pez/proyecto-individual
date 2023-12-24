import { useState, useEffect } from "react";
import validation from "./validation";

const Hp = () => {

  const [userData, setUserData] = useState({
    hp: 0,
  });
console.log(userData);
  const [errors, setErrors] = useState({});

  const aumentar = (event) => {
    event.preventDefault();
    const currentHp = Number(userData.hp);
    if (currentHp >= 0 && currentHp < 250) {
      setUserData({ ...userData, hp: currentHp + 1 });
    }
  };

  const disminuir = (event) => {
    event.preventDefault();
    const currentHp = Number(userData.hp);
    if (currentHp > 1 && currentHp <= 250) {
      setUserData({ ...userData, hp: currentHp - 1 });
    }
  };

  const resetear = (event) => {
    event.preventDefault();
    setUserData({ ...userData, hp: 0 });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'hp') {
      const parsedValue = parseInt(value);
      const userValidated = validation({ hp: parsedValue });

      setErrors({
        ...errors,
        hp: userValidated.hp || '', // Utiliza el mensaje de error validado o establece cadena vacía
      });

      if (!userValidated.hp) {
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
    if (event.key === 'ArrowUp' && userData.hp < 240) {
      event.preventDefault();
      setUserData({ ...userData, hp: userData.hp + 10 });
    } else if (event.key === 'ArrowDown' && userData.hp >= 10) {
      event.preventDefault();
      setUserData({ ...userData, hp: userData.hp - 10 });
    } else if (event.key === 'ArrowDown' && userData.hp < 10) {
      event.preventDefault(); // Evita el comportamiento predeterminado del navegador para la tecla presionada
      // No se actualiza el estado de userData.hp si es menor que 10
    }
  };

  useEffect(() => {
    if (userData.hp !== 0) {
      const userValidated = validation(userData);
      setErrors(userValidated);
    }
  }, [userData]);

  return (
    <div>
      <label htmlFor="hp">Hp</label>
      <input
        id="hp"
        placeholder="Hp"
        type="number"
        name="hp"
        value={userData.hp}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        min="0"
        max="250"
        step="1"
      />
      <button onClick={aumentar}>▲</button>
      <button onClick={resetear}>○</button>
      <button onClick={disminuir}>▼</button>
      {errors.hp && <p style={{ color: "red" }}>{errors.hp}</p>}
    </div>
  );
};

export default Hp;