import { Container, Navbar } from "react-bootstrap";
import '../styles/Header.css'

const Header = () => {
  return (
    <>
      <div className="header">
        <Navbar className="bg-body-tertiary">
          <Container>
            <Navbar.Brand>
              <h1>Joblist</h1>
            </Navbar.Brand>
          </Container>
        </Navbar>
        <br />
      </div>
    </>
  );
};

export default Header;
