import React from "react";
import { Navbar, Container, Image, NavDropdown, Nav } from "react-bootstrap";
import { getUser, useUserActions } from "../hooks/user.actions";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

function Navigationbar() {
    const user = getUser();
    const userActions = useUserActions();

    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand className="fw-bold" href="#home">
                    Travel Social Network
                </Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <NavLink className="nav-link mx-4" to={`/room/`}>
                            <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: '2.1rem' }} />
                        </NavLink>
                        
                        <NavDropdown title={
                            <Image src={user.avatar} roundedCircle width={36} height={36} />
                        }>
                            <NavDropdown.Item className="fw-bold" as={Link} to={`/profile/${user.id}/`}>Profile</NavDropdown.Item>
                            <NavDropdown.Item className="fw-bold" onClick={userActions.logout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigationbar;