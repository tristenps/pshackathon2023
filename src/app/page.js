'use client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import CircularProgress from '@mui/material/CircularProgress';
import {Search} from '@mui/icons-material';

import {useState} from 'react';

import Image from 'next/image'
import Gallery from './gallery';

function Form() {
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [products, setProducts] = useState([]);

  function handleText(e) {
    setPrompt(e.target.value);
  }

  function handleSubmit(e) {
    if (prompt !== ''){
      setIsLoading(true);
      setProducts([]);
      fetch('http://localhost:8000/products', {
        method: 'POST',
        body: JSON.stringify({prompt}),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      }).then((response)=> response.json())
        .then((data)=> {
          //console.log(data);
          setProducts(data);
          setIsLoading(false);
        })
    }
  }

  return (
    <Box component="form" noValidate autoComplete='off'>
      <Grid container spacing={2}>
        <Grid xs={11}>
          <TextField
            sx={{textarea: {color: 'white'}}}
            id="outlined-basic"
            label="Event Description"
            variant="outlined"
            focused
            fullWidth
            multiline
            minRows={1}
            value={prompt}
            onChange={handleText}
         >
         </TextField>
        </Grid>
        <Grid xs={1}>
          {isLoading ? <CircularProgress size="3.5rem"/> : 
            <Button variant="text" color="info"
            disabled={isLoading}
            onClick={handleSubmit}
            >
            <Search fontSize='large'/>
            </Button>
          }
        </Grid>
      </Grid>
      <Grid xs={12} className="align-center">
        {<Gallery products={products}/>}
      </Grid>
    </Box>
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-fit w-full items-center justify-between font-mono text-sm lg:flex align-middle">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://promostandards.org/2023-Virtual-Hack-A-Thon"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/logo.png"
              alt="PromoPaladins Logo"
              className=""
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>
      <div className='z-1 max-w-4xl w-full items-center font-mono'>
        <Form/>
      </div>
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
      </div>

    </main>
  )
}
