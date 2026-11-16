import { Link, useLocation } from 'react-router-dom';
import { splitLocalizedPath } from '../../../config/seo';
import '../../../assets/styles/Header/Navigation.css';

interface NavItemProps {
  to: string;
  label: string;
  onClick: () => void;
  ariaLabel: string;
  prominent?: boolean;
}

function NavItem({ to, label, onClick, ariaLabel, prominent = false }: NavItemProps) {
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
        <span className="nav-label">{label}</span>
        {prominent && <span aria-hidden="true">↗</span>}
      </Link>
    </li>
  );
}

export default NavItem;
