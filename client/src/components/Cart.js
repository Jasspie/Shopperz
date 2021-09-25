import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, addToCart } from "./redux/actions/cartActions";
import { userCheckout } from "./redux/actions/userActions";
import { useHistory } from "react-router-dom";
import Navigation from "../Navigation";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import styled from "styled-components";
import CartItem from "./CartItem";

const StyledCard = styled(Card)`
  border-color: white;
`;

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  let history = useHistory();
  const checkout = useSelector((state) => state.userCheckout);

  const dispatch = useDispatch();

  const changeItemQuantity = (id, quantity) => {
    dispatch(addToCart(id, quantity));
  };

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
  };

  useEffect(() => {
    if (checkout.checkoutInfo) {
      window.location = checkout.checkoutInfo;
    }
  }, [checkout.checkoutInfo]);

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
          <Col lg={9} className="mb-5">
            {cartItems.length === 0 ? (
              <>
                <h2 className="mb-3">Your Cart is Empty </h2>
                <Button
                  onClick={() => history.push("/")}
                  variant="outline-primary"
                >
                  Go Back
                </Button>
              </>
            ) : (
              cartItems.map((item, index) => {
                // console.log(cartItems);
                return (
                  <CartItem
                    key={index}
                    item={item}
                    removeItem={removeItem}
                    changeItemQuantity={changeItemQuantity}
                  />
                );
              })
            )}
          </Col>
          {cartItems.length > 0 && (
            <Col lg={3}>
              <StyledCard className="p-4 shadow">
                <h3>
                  Total (
                  {cartItems.reduce(
                    (quantity, item) => Number(item.quantity) + quantity,
                    0
                  )}
                  ) Items:{" "}
                </h3>
                <h4>
                  {formatter.format(
                    cartItems.reduce(
                      (price, item) =>
                        Number(item.quantity) * Number(item.price) + price,
                      0
                    )
                  )}
                </h4>
                <Button
                  variant="outline-primary"
                  className="mt-4"
                  onClick={() => dispatch(userCheckout(cartItems))}
                >
                  Checkout
                </Button>
              </StyledCard>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
}
