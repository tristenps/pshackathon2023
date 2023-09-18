import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';

export default function Product(props) {
  return (
    <Card sx={{maxWidth: 220}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height= "100"
          image={props.img || "https://i.imgur.com/MK3eW3Am.jpg"}
          alt="Product Image"
        />
        <CardContent>
          <Typography variant="h6" component="div">
            {props.name || 'Promotional Product'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.supplier || 'Sanmar'}
            {' '}
            {props.price || '$3.89'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description || 'Amazing'}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
