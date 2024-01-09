import styles from './image.module.css';
import validation from "./validation";
import { useState, useEffect } from "react";

/* const Image = ({ name, value, onChange }) => {
    const [userData, setUserData] = useState({
        image: value || "",
    });

    const [errors, setErrors] = useState({}); */

  
    /* const handleChange = (event) => {
        const { value } = event.target;

        setUserData({
            ...userData,
            image: value, 
        });
       
        const userValidated = validation({ image: value });
        setErrors(userValidated);
        onChange(value);
    }; */

     /* const handleChange = (event) => {
        const { value } = event.target;
      
        const userValidated = validation({ image: value });
      
        setErrors(userValidated);
      
        if (!userValidated.image) {
          setUserData({
            ...userData,
            image: value,
          });
          onChange(value);
        } else {
          setUserData({
            ...userData,
            image: userData.image,
          });
        }
      }; 

      useEffect(() => {
        if (userData.image.trim() !== '') {
            const userValidated = validation(userData); 
            setErrors(userValidated);
        }
    }, [userData]); 

    return (
        <div className= {styles.container}>
            <div className= {styles.label}><label htmlFor="image">url</label></div>
            <input className= {styles.imageinput}
                id="image"
                type="text"
                name={name}
                placeholder="URL dell'immagine"
                value={userData.image} 
                onChange={handleChange}
            />
            {errors.image && <p style={{ color: 'red' }}>{errors.image}</p>}
        </div>
    );
};

export default Image; */

// ... (importaciones y definiciones)

const Image = ({ name, value, onChange }) => {
  const [userData, setUserData] = useState({
      image: value || "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
      const { value } = event.target;
    
      const userValidated = validation({ image: value });
      setErrors(userValidated);
    
      setUserData({
          ...userData,
          image: value,
      });
    
      onChange(value);
  }; 

  useEffect(() => {
      if (userData.image.trim() !== '') {
          const userValidated = validation(userData); 
          setErrors(userValidated);
      }
  }, [userData]); 

  return (
      <div className={styles.container}>
          <div className={styles.label}>
              <label htmlFor="image">URL</label>
          </div>
          <input
              className={styles.imageinput}
              id="image"
              type="text"
              name={name}
              placeholder="URL dell'immagine"
              value={userData.image} 
              onChange={handleChange}
          />
          {errors.image && <p style={{ color: 'red' }}>{errors.image}</p>}
      </div>
  );
};

export default Image;
