import React, { useState, useEffect } from "react";
import Navigation from "../Navigation";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "./redux/actions/userActions";

export default function SignIn({ location, history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo, error } = userSignIn;

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
        <Row style={{ height: "70vh" }}>
          <Col lg={5} className="m-auto">
            <Form>
              <h2 className="mb-3 text-center">Sign In</h2>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                {error && <Alert variant="danger">{error}</Alert>}
                <Form.Label>Email</Form.Label>
                <Form.Control
                  size="lg"
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  size="lg"
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
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
                  dispatch(signin(email, password));
                }}
              >
                Submit
              </Button>
              <h6 className="mt-4 text-center">
                New User? <a href="/register">Register</a>
              </h6>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
