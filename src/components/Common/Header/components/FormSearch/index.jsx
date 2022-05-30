import { CircularProgress, Stack, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import categoryApi from 'api/categoryApi';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

function FormSearch() {
  const navigate = useNavigate();
  const location = useLocation();

  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const [options, setOptions] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(true);

  const form = useForm({
    defaultValues: {
      search: '',
    },
  });

  useEffect(() => {
    const fetchDataCategories = async () => {
      try {
        const list = await categoryApi.getAll();
        const listCategoryMap = list.map((category) => ({
          name: category.searchTerm,
        }));
        setOptions(listCategoryMap);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    };

    fetchDataCategories();
  }, []);

  const navigateToListPage = (categoryName) => {
    if (!categoryName) return;

    if (location.pathname !== '/products') {
      navigate('products', { state: { searchTerm: categoryName } });
    } else {
      const filters = {
        ...queryString.parse(location.search),
        'category.searchTerm': categoryName,
      };
      setSearchParams(queryString.stringify(filters));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // Prevent's default 'Enter' behavior.
      // e.defaultMuiPrevented = true;
      console.log(e.target.value);
      console.log({ searchValue });

      navigateToListPage(searchValue);
    }
  };

  const handleSearchSubmit = (e, value) => {
    const categoryName = value?.name;

    navigateToListPage(categoryName);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSearchSubmit)}>
      <Stack spacing={2} sx={{ width: 300 }}>
        <Autocomplete
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(0, 0, 0, 0.2) !important',
            },
            '& .MuiOutlinedInput-root': {
              padding: '6px',
            },
          }}
          id="search-categories"
          options={options}
          loading={loading}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search something..."
              variant="filled"
              color="warning"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          getOptionLabel={(option) => `${option.name}`}
          noOptionsText="No options found!"
          inputValue={searchValue}
          onInputChange={(_, newSearchValue) => {
            setSearchValue(newSearchValue);
          }}
          onChange={handleSearchSubmit}
          onKeyDown={handleKeyDown}
          blurOnSelect
        />
      </Stack>
    </form>
  );
}
export default FormSearch;
