import AodIcon from '@mui/icons-material/Aod';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import MasksIcon from '@mui/icons-material/Masks';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import WomanIcon from '@mui/icons-material/Woman';
import { Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import UseInput from 'hooks/useInput';
import queryString from 'query-string';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    width: '100%',
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
    transform: 'translateX(-25px) !important',
  },
}));

const SEARCH_TERMS = [
  { name: 'ao so mi nu', icon: <WomanIcon /> },
  { name: 'khau trang', icon: <MasksIcon /> },
  { name: 'lam dep', icon: <FaceRetouchingNaturalIcon /> },
  { name: 'macbook', icon: <LaptopMacIcon /> },
  { name: 'o cung ssd', icon: <AodIcon /> },
  { name: 'iphone', icon: <PhoneIphoneIcon /> },
];

function FormSearch() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const form = useForm({
    defaultValues: {
      search: '',
    },
  });

  const handleSearchSubmit = (values) => {
    if (!values.search.trim()) return;

    if (location.pathname !== '/products') {
      navigate('products', { state: { searchTerm: values } });
    } else {
      const filters = {
        ...queryString.parse(location.search),
        'category.searchTerm': values.search,
      };
      setSearchParams(queryString.stringify(filters));
    }
  };

  return (
    <HtmlTooltip
      title={
        <>
          <Typography color="inherit">Only used for: </Typography>
          <List>
            {SEARCH_TERMS.map((item) => (
              <ListItem disablePadding key={item.name}>
                <ListItemButton
                  onClick={() => handleSearchSubmit({ search: item.name })}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      }
    >
      <form onSubmit={form.handleSubmit(handleSearchSubmit)}>
        <UseInput form={form} name="search" />
      </form>
    </HtmlTooltip>
  );
}

export default FormSearch;
