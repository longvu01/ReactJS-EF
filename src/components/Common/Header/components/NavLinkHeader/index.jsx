import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import styles from './NavLinkHeader.module.scss';

NavLinkHeader.propTypes = {};

function NavLinkHeader({ to, content }) {
  return (
    <NavLink
      className={styles.link}
      to={to}
      style={({ isActive }) =>
        isActive
          ? {
              color: 'orangered',
            }
          : undefined
      }
      end
    >
      <Button color="inherit">{content}</Button>
    </NavLink>
  );
}

export default NavLinkHeader;
