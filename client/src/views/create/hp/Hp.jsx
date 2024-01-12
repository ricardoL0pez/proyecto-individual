import styles from './hp.module.css';
import { useState, useEffect } from "react";
import validation from "./validation";

const Hp = ({ name, value, onChange }) => {

  const [userData, setUserData] = useState({
    hp: value || 0, 
  });

  const [errors, setErrors] = useState({});

  const aumentar = (event) => {
    event.preventDefault();
    const currentHp = Number(userData.hp);
    if (currentHp >= 0 && currentHp < 250) {
      setUserData({ ...userData, hp: currentHp + 1 });
      onChange(currentHp + 1); 
    }
  };

  const disminuir = (event) => {
    event.preventDefault();
    const currentHp = Number(userData.hp);
    if (currentHp > 1 && currentHp <= 250) { //xxvalor a 0
      setUserData({ ...userData, hp: currentHp - 1 });
      onChange(currentHp - 1); 
    }
  };

  const resetear = (event) => {
    event.preventDefault();
    setUserData({ ...userData, hp: 0 });
    onChange(0); 
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'hp') {
      const parsedValue = parseInt(value);
      const userValidated = validation({ hp: parsedValue });

      setErrors({
        ...errors,
        hp: userValidated.hp || '', 
      });

      if (!userValidated.hp) { 
        setUserData({
          ...userData,
          [name]: parsedValue,
        });
        onChange(parsedValue); 
      } else {
        setUserData({ 
          ...userData,
          [name]: value, 
        });
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowUp' && userData.hp < 240) {
      event.preventDefault();
      setUserData({ ...userData, hp: userData.hp + 10 });
      onChange(userData.hp + 10); 
    } else if (event.key === 'ArrowDown' && userData.hp >= 10) {
      event.preventDefault();
      setUserData({ ...userData, hp: userData.hp - 10 });
      onChange(userData.hp - 10); 
    } else if (event.key === 'ArrowDown' && userData.hp < 10) {
      event.preventDefault(); 
    }
  };

  useEffect(() => {
    if (userData.hp !== 0) {
      const userValidated = validation(userData);
      setErrors(userValidated);
    } else {
      setErrors({}); 
    }
  }, [userData]);

  return (
    <div className= {styles.container}>
      <div className= {styles.label}><label htmlFor="hp">Hp</label></div>
      <input className= {styles.input}
        id="hp"
        placeholder="Hp"
        type="number"
        name={name} 
        value={userData.hp}
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
      
      {errors.hp && <p style={{ color: "red" }}>{errors.hp}</p>}
    </div>
  );
};

export default Hp;