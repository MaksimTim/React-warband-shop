import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const FullPizza = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState();
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://62ea84cfad295463258e96ec.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("ошибка");
        navigate('/')
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return 'Loading...'
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl}/>
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
    </div>
  );
};

export default FullPizza;
