import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar({ categories }) {
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    navigate(`/products?category.id=${id}`);
  };

  return (
    <div className={cx('wrapper')}>
      <nav aria-label="sidebar">
        <List>
          {categories.map((item) => (
            <ListItem
              disablePadding
              key={item.id}
              onClick={() => handleNavigate(item.id)}
            >
              <ListItemButton>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </div>
  );
}

export default Sidebar;
