import React from "react";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { signout } from "./components/redux/actions/userActions";

export default function Navigation() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  let history = useHistory();
  const dispatch = useDispatch();
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Shopperz</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" style={{ marginRight: "0.7rem" }}>
              Shop
            </Nav.Link>
            <Nav.Link href="/cart" style={{ marginRight: "0.7rem" }}>
              Cart (
              {cartItems.reduce(
                (quantity, item) => Number(item.quantity) + quantity,
                0
              )}
              ) <FaShoppingCart />
            </Nav.Link>
            {userInfo ? (
              <>
                <Nav.Link href="/" style={{ marginRight: "0.7rem" }}>
                  Hi, {userInfo.name}
                </Nav.Link>
                <Button
                  variant="outline-primary"
                  onClick={() => dispatch(signout())}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Button
                variant="outline-primary"
                onClick={() => history.push("/signin")}
              >
                Sign In
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
