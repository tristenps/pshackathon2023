import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

import Product from './product';

export default function Gallery(props) {
  return (
    <Box sx={{
    }}>
      <Grid container rowSpacing={4} columnSpacing={0}>
        {props.products && props.products.length > 0 ?
          props.products.map( prod=> (
            <Grid xs={3} key={prod.key}>
              <Product
                name={prod.name}
                supplier={prod.supplier}
                img={prod.img}
                price={'$' + prod.price}
                description={prod.description}
                isLoading={prod.isLoading || false}
                eventDesc={prod.eventDesc}
                key={prod.key}
              />
            </Grid>
          ))
          : ''}
      </Grid>
    </Box>
  );
}
