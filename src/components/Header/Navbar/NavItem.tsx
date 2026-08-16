import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { splitLocalizedPath } from '../../../config/seo';
import '../../../assets/styles/Header/Navigation.css';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  ariaLabel: string;
}

function NavItem({ to, icon, label, onClick, ariaLabel }: NavItemProps) {
  const location = useLocation();
  const isActive = splitLocalizedPath(location.pathname).pathname === splitLocalizedPath(to).pathname;

  return (
    <li className="nav-item">
      <Link
        to={to}
        onClick={onClick}
        aria-label={ariaLabel}
        aria-current={isActive ? "page" : undefined}
        className={`nav-link${isActive ? ' active' : ''}`}
      >
        <span className="nav-icon" aria-hidden="true">
          {icon}
        </span>
        <span className="nav-label">{label}</span>
      </Link>
    </li>
  );
}

export default NavItem;
