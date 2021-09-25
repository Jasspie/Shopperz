import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts as retrieveProducts } from "./redux/actions/productActions";
import { Container, Col, Row } from "react-bootstrap";
import Navigation from "../Navigation";
import ProductCard from "./ProductCard";

export default function Home() {
  const dispatch = useDispatch();

  const getProducts = useSelector((state) => state.getProducts);
  const { products, loading, error } = getProducts;

  useEffect(() => {
    dispatch(retrieveProducts());
  }, [dispatch]);

  return (
    <>
      <Navigation />
      <Container>
        <Row className="mt-4">
          {loading ? (
            <h2>Loading Products...</h2>
          ) : error ? (
            <h2>{error}</h2>
          ) : (
            products.map((product, index) => {
              return (
                <Col lg={4} md={4} xs={6} className="my-3" key={index}>
                  <ProductCard {...product} />
                </Col>
              );
            })
          )}
        </Row>
      </Container>
    </>
  );
}
