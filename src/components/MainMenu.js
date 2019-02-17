import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';

export default function MainMenu() {
  const [expanded, setExpanded] = useState(false);

  const user = {
    label: 'Test',
  };

  const signOut = () => console.log('sign out');

  return (
    <Navbar color="primary" dark expand="md">
      <Container>
        <NavbarBrand tag={Link} to="/">
          Ferienspiele Rothenbergen
        </NavbarBrand>
        <NavbarToggler onClick={() => setExpanded(e => !e)} />

        <Collapse navbar isOpen={expanded}>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <span className="navbar-text">
                <i className="fa fa-user mr-1" /> {user.label}
              </span>
            </NavItem>
            <NavItem>
              <NavLink href="" onClick={signOut}>
                <small>(abmelden)</small>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}
