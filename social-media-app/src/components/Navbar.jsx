import React from "react";
import { Navbar, Container, Image, NavDropdown, Nav } from "react-bootstrap";
import { getUser, useUserActions } from "../hooks/user.actions";
import { Link, NavLink } from "react-router-dom";
import { MailOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

function Navigationbar() {
    const user = getUser();
    const userActions = useUserActions();
    const { roomId } = useParams();

    return (
        <Navbar variant="dark">
            <Container>
                <Navbar.Brand className="fw-bold" href="/">
                    Weekend World
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/main/">Newsline</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <NavLink className="nav-link mx-4" to={`/room/${roomId}`}>
                            <MailOutlined style={{ fontSize: '2.1rem' }} />
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