import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import '../../../assets/styles/Header/header.css';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  ariaLabel: string;
}

function NavItem({ to, icon, label, onClick, ariaLabel }: NavItemProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Nav.Item>
      <Nav.Link
        as={Link}
        to={to}
        onClick={onClick}
        aria-label={ariaLabel}
        aria-current={isActive ? "page" : undefined}
        className={isActive ? 'active' : ''}
      >
        <span className="nav-icon" aria-hidden="true">
          {icon}
        </span>
        <span className="nav-label">{label}</span>
      </Nav.Link>
    </Nav.Item>
  );
}

export default NavItem;
