import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "./redux/actions/productActions";
import { addToCart } from "./redux/actions/cartActions";
import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";
import styled from "styled-components";
import Navigation from "../Navigation";

const StyledCard = styled(Card)`
  border-color: white;
`;

const StyledText = styled.h6`
  color: #616161;
`;

export default function Product() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  let history = useHistory();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.getProductDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    // console.log(product);
    if (product && !product._id) {
      dispatch(getProductDetails(id));
    }
  }, [dispatch, product, id]);

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, quantity));
    history.push("/cart");
  };

  const selectOptions = (quantity) => {
    const options = [];
    for (var i = 0; i < quantity; i++) {
      options.push(
        <option key={i + 1} value={i + 1}>
          {i + 1}
        </option>
      );
    }
    // console.log(options);
    return options;
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2,
  });

  return (
    <>
      <Navigation />
      <Container>
        <Row className="mt-4">
          {loading ? (
            <h2>Loading Product Details...</h2>
          ) : error ? (
            <h2>{error}</h2>
          ) : (
            <>
              <Col lg={6}>
                <Image src={product.imageUrl} fluid className="shadow" />
              </Col>
              <Col lg={6}>
                <StyledCard className="p-4 shadow">
                  <Row>
                    <Col lg={12}>
                      <h2 className="mb-3">
                        {product.name} -{" "}
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                        {/* {product.countInStock > 0
                          ? ` (${product.countInStock})`
                          : ""} */}
                      </h2>
                      <h4 className="mb-3">
                        {formatter.format(product.price)}
                      </h4>
                      <StyledText className="mb-4">
                        {product.description}
                      </StyledText>
                    </Col>
                    {product.countInStock > 0 && (
                      <>
                        <Col lg={3} xs={3}>
                          <select
                            className="form-select"
                            value={quantity}
                            onChange={(event) => {
                              setQuantity(event.target.value);
                            }}
                          >
                            {selectOptions(product.countInStock)}
                          </select>
                        </Col>
                        <Col lg={4} xs={4}>
                          <Button
                            variant="outline-success"
                            onClick={addToCartHandler}
                          >
                            Add to Cart
                          </Button>
                        </Col>
                      </>
                    )}
                  </Row>
                </StyledCard>
              </Col>
            </>
          )}
        </Row>
      </Container>
    </>
  );
}
