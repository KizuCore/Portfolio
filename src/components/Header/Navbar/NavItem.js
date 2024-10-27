import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../../Assets/style/Header/header.css';

function NavItem({ to, icon, label, onClick, ariaLabel }) {
  return (
    <Nav.Item>
      <Nav.Link as={Link} to={to} onClick={onClick} aria-label={ariaLabel}>
        {icon} {label}
      </Nav.Link>
    </Nav.Item>
  );
}

export default NavItem;
