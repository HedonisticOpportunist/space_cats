import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import HomeBreadcrumbs from "../components/HomeBreadcrumbs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const UserDashboard = () => {
  const navigate = useNavigate();

  // STATES
  const [cookies, removeCookie] = useCookies([]);
  const [message, setMessage] = useState("");

  // VERIFY COOKIE FUNCTION
  // Credit @ https://www.freecodecamp.org/news/how-to-secure-your-mern-stack-application/
  // Any further modifications are mine and mine alone.
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:5000/dashboard",
        {},
        { withCredentials: true }
      );

      const { status, user } = data;
      return status
        ? setMessage(`Hello ${user}`, {
            position: "top-right",
          })
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  // LOGOUT FUNCTION
  // Credit @ https://www.freecodecamp.org/news/how-to-secure-your-mern-stack-application/
  // Any further modifications are mine and mine alone.
  function Logout() {
    removeCookie("token");
    navigate("/signup");
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            {/* BREADCRUMBS */}
            <HomeBreadcrumbs></HomeBreadcrumbs>
          </Col>
          <Col>
            {/* PAGE TITLE */}
            <h3>User Dashboard</h3>
          </Col>
          <Col>
            {/* WELCOME MESSAGE */}
            <p>{message}</p>
          </Col>
          <Col>
            {/* LOGOUT BUTTON */}
            <button onClick={Logout}>LOGOUT</button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserDashboard;
