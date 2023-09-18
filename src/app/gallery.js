import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

import Product from './product';

export default function Gallery(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {props.products && props.products.length > 1 ?
          props.products.map( prod=> (
            <Grid xs={3}>
              <Product
                name={prod.name}
                supplier={prod.supplier}
                img={prod.img}
                price={'$' + prod.price}
                description={prod.description}
              />
            </Grid>
          ))
          : ''}
      </Grid>
    </Box>
  );
}
