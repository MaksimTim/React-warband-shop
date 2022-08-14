import React, { useEffect, useState } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
    description: string
  }>();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://62ea84cfad295463258e96ec.mockapi.io/products/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("ошибка");
        navigate("/");
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return <>Loading...</>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} /><br/>
      <h2>{pizza.title}</h2><br/>
      <p>{pizza.description}</p><br/>
      <h4>Цена: {pizza.price} динар.</h4><br/>
      <Link to={'/'}>
      <button className="button button--outline button--add">
        <span>Назад</span>
      </button></Link>
    </div>
  );
};

export default FullPizza;
