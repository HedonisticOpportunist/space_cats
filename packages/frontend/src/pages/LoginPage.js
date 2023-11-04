import axios from "axios";
import { Button, Container, Col, Form, Row } from "react-bootstrap";
import Cookies from "universal-cookie";
import HomeBreadcrumbs from "../components/HomeBreadcrumbs";
import { Link } from "react-router-dom";
import { useState } from "react";

const cookies = new Cookies();

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const configuration = {
      method: "post",
      url: "http://localhost:5000/login",
      data: {
        email,
        password,
      },
    };
    axios(configuration)
      .then((result) => {
        cookies.set("TOKEN", result.data.token, {
          path: "/",
        });
        window.location.href = "/auth";

        setLogin(true);
      })
      .catch((error) => {
        error = new Error();
      });
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <h1>Login</h1>
          </Col>
          <Col>
            <HomeBreadcrumbs></HomeBreadcrumbs>
          </Col>
          <Col>
            Don't have an account? Then,
            <Link to="/register"> please sign up.</Link>
          </Col>
          <Col>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address: </Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password: </Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </Form.Group>
              <Button
                className="btn-grad"
                variant="outline-dark"
                type="submit"
                onClick={(e) => handleSubmit(e)}
                size="lg"
              >
                🐾Login
              </Button>
            </Form>
          </Col>
          <Col>
            {login ? (
              <p className="text-success">
                You have been logged in successfully.
              </p>
            ) : (
              <p className="text-danger">You are not logged in.</p>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPage;
