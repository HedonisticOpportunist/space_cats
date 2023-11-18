import axios from "axios";
import { Button, Form, Container, Col, Row } from "react-bootstrap";
import log from "loglevel";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SignupForm = () => {
  // NAVIGATE TO DASHBOARD
  const navigate = useNavigate();

  // STATES
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // TOAST MESSAGES
  const handleError = "👻👻Error. Please try signing up again.";
  const handleSuccess = "🦄🦄 Success! You have been signed up.";

  // SIGN UP FUNCTION
  // Credit @ https://www.freecodecamp.org/news/how-to-secure-your-mern-stack-application/
  // Any further modifications and errors are mine and mine alone.
  const signup = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/signup",
        {
          username,
          email,
          password,
        },
        { withCredentials: true }
      );
      log.info(data);
      const { message, success } = data;
      if (success || message.includes("success")) {
        setMessage(handleSuccess);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        setMessage(handleError);
      }
    } catch (error) {
      log.error(error);
    }
    setUserName(username);
    setEmail(email);
    setPassword(password);
  };

  // SUBMIT FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();
    signup();

    // Ensure validation fails if all the necessary fields are empty.
    if (username === "" || email === "" || password === "") {
      setMessage(handleError);
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="formBasicUserName"
                required
              >
                <Form.Label>Username: </Form.Label>
                <Form.Control
                  type="username"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter username"
                  required
                />
              </Form.Group>
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
              {/* SIGN UP BUTTON */}
              <Button
                className="btn-grad"
                variant="outline-dark"
                type="submit"
                size="lg"
                onClick={handleSubmit}
              >
                🐾Sign Up
              </Button>
            </Form>
          </Col>
          <Col>
            {/* SIGN UP STATUS MESSAGE */}
            <p>{message}</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignupForm;
