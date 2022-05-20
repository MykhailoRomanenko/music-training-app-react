import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from 'react-bootstrap/Nav'
import {Link} from 'react-router-dom'
import {testAudio} from "../services";

const Header = () => {

    return (
        <Navbar className="header" bg="light" expand="md">
            <Container>
                <Link className="navbar-brand" to="/">MusicLib</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="nav-link" to="/chords">Chords</Link>
                        <Link className="nav-link" to="/scales">Scales</Link>
                    </Nav>
                </Navbar.Collapse>
                <span className="fa fa-play fa-2x" data-toggle="tooltip" data-placement="left"
                      title="Test sound" onClick={() => testAudio()} style={{cursor: 'pointer'}}/>
            </Container>
        </Navbar>
    )
}

export default Header