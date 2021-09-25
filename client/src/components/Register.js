import React, { useState, useEffect } from "react";
import Navigation from "../Navigation";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { register } from "./redux/actions/userActions";

export default function Register({ location, history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  useEffect(() => {
    const redirect = location.search ? location.search.split("=")[1] : "/";
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, location.search]);
  return (
    <>
      <Navigation />
      <Container>
        <Row style={{ height: "85vh" }}>
          <Col lg={5} className="m-auto">
            <Form className="mt-4">
              <h2 className="mb-3 text-center">Register</h2>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                {error && (
                  <Alert variant="danger">
                    Missing Fields or Passwords Do Not Match
                  </Alert>
                )}
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Re-enter Password"
                  value={password1}
                  onChange={(event) => setPassword1(event.target.value)}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                style={{
                  width: "100%",
                  marginTop: "0.7rem",
                  padding: "0.7rem",
                }}
                onClick={(event) => {
                  event.preventDefault();
                  if (password !== password1) {
                    setError(true);
                  } else {
                    dispatch(register(name, email, password));
                  }
                }}
              >
                Submit
              </Button>
              <h6 className="mt-4 text-center">
                Returning User? <a href="/signin">Sign In</a>
              </h6>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
