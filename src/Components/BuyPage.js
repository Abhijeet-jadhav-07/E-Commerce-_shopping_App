import React, {useState, useEffect} from "react"
import Axios from "axios";
import * as faker from "faker";
import {random, commerce, datatype} from "faker"
import { Container, Row, Col } from "reactstrap";

import CartItem from "./CartItem";

const apiKey = "INSET_YOUR_KEY_HERE";

const url = "https://api.pexels.com/v1/search?query=laptop&per_page=6&page=1"

const localurl = "https://jsonware.com/json/1f3e33b9b4a0ee7177de60941e87ae1a.json"

const BuyPage = ({ addInCart }) => {
  const [product, setProduct] = useState([]);

  //   const fetchPhotos = async () => {
  //     const response = await Axios.get(url, {
  //       header: {
  //         Authorization: apiKey
  //       }
  //     });

  const fetchPhotos = async () => {
    const { data } = await Axios.get(localurl, {});

    const { photos } = data;

    const allProduct = photos.map(photo => ({
      smallImage: photo.src.medium,
      tinyImage: photo.src.tiny,
      productName: random.word(),
      productPrice: commerce.price(),
      id: faker.datatype.uuid()
    }));

    setProduct(allProduct);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <Container fluid>
      <Row>
        {product.map(product => (
          <Col md={4} key={product.id}>
            <CartItem product={product} addInCart={addInCart} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BuyPage;
