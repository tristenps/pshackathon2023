import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, Dialog, DialogContent, DialogContentText, DialogTitle, Skeleton} from '@mui/material';
import { useState } from 'react';

export default function Product(props) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick(){
    setIsOpen(true);
  }
  function handleClose(){
    setIsOpen(false);
  }

  return (
    <div>
    {props.isLoading ?
      <Skeleton sx={{margin: '1rem', bgcolor: '#181818'}} height={500} animation='wave'/> : 
      <Card sx={{maxWidth: 220 }}>
        <CardActionArea onClick={handleClick}>
          <CardMedia
            component="img"
            height= "100"
            image={props.img}
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
          </CardContent>
        </CardActionArea>
        <Dialog open={isOpen} onClose={handleClose}>
          <DialogTitle>Why this product?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {props.eventDesc || 'Because!'}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Card>
    }
    </div>
  )
}
