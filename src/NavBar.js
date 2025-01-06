import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from "./Components/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Utils/AuthContext";
const NavBar = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    return (  
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">Map Journal</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                        <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
                            {currentUser && <><Nav.Link onClick={() => navigate("/dashboard")}>Dashboard</Nav.Link>
                            <Nav.Link onClick={() => navigate("/gallery")}>Gallery</Nav.Link></>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* <Button className="navBarButton" text="Home" action={() => navigate("/")} />
            { currentUser && 
            <>
            <Button className="navBarButton" text="Dashboard" action={() => navigate("/dashboard")} />
            <Button className="navBarButton" text="Gallery" action={() => navigate("/gallery")} />
                </>} */}
        </div>
    );
}
 
export default NavBar;