import { Link, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { FiArrowRight } from '@react-icons/all-files/fi/FiArrowRight';
import { splitLocalizedPath } from '@/shared/config/seo';
import '../Navigation.css';

interface NavItemProps {
  to: string;
  label: string;
  onClick: () => void;
  ariaLabel: string;
  prominent?: boolean;
  icon?: ReactNode;
}

function NavItem({ to, label, onClick, ariaLabel, prominent = false, icon }: NavItemProps) {
  const location = useLocation();
  const currentPath = splitLocalizedPath(location.pathname).pathname;
  const targetPath = splitLocalizedPath(to).pathname;
  const isActive = currentPath === targetPath || (targetPath === '/project' && currentPath.startsWith('/realisations/'));

  return (
    <li className="site-nav-item">
      <Link
        to={to}
        onClick={onClick}
        aria-label={ariaLabel}
        aria-current={isActive ? "page" : undefined}
        className={`site-nav-link${isActive ? ' active' : ''}${prominent ? ' site-nav-contact' : ''}`}
      >
        {icon && <span className="site-nav-mobile-icon" aria-hidden="true">{icon}</span>}
        <span className="nav-label">{label}</span>
        <FiArrowRight className="site-nav-mobile-arrow" aria-hidden="true" />
        {prominent && <span aria-hidden="true">↗</span>}
      </Link>
    </li>
  );
}

export default NavItem;
