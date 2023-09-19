'use client';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';

import {useState} from 'react';

import Image from 'next/image'
import Gallery from './gallery';
import ChatBox from './chat';
import { Stack, Typography } from '@mui/material';


const EmptyProducts = [
  {key: 1, isLoading: true},
  {key: 2, isLoading: true},
  {key: 3, isLoading: true},
  {key: 4, isLoading: true},
]

function Chat() {
  const [msg, setMsg] = useState('');
  const [messages, setMessages]= useState([]);
  const [products, setProducts]= useState([]);
  const [isLoading, setIsLoading]= useState(false);

  function addMessage(message) {
    setMessages(prevState => {
      return [...prevState, message]
    });
  }

  function handleMsg(e) {
    setMsg(e.target.value)
  }

  function handleKeypress(e) {
    if (e.charCode == 13) {
      setIsLoading(true);
      fetch('http://localhost:8000/products', {
        method: 'POST',
        body: JSON.stringify({prompt:msg}),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      }).then((response)=> response.json())
        .then((data)=> {
          setMessages(prevState=> {
            return [...prevState.filter((msg)=>!msg.isLoading)]
          })
          addMessage({
            message: 'Take a look at what I found!',
            isLoading: false,
            type: 'system',
            key: messages.length+1,
          });
          console.log(data);
          setProducts(data);
          setIsLoading(false);
        })
      setMsg('');
      addMessage({
        message: msg,
        isLoading: false,
        type: 'user',
        key: messages.length+1,
      });
      setProducts(EmptyProducts);
      addMessage({
        message: 'Okay! Let me look and see what I can find...',
        isLoading: false,
        type: 'system',
        key: messages.length+1,
      });
      addMessage({
        isLoading: true,
        type: 'system',
        key: messages.length+1,
      });
    }
  }

  return(
    <Grid container spacing={1}>
      <Grid xs={4}>
        <Stack>
          <div className='h-128 overflow-auto'>
            <ChatBox messages={messages}/>
          </div>
          <TextField
            sx={{textarea: {color: 'white'}}}
            id="outlined-basic"
            label=""
            variant="outlined"
            focused
            fullWidth
            multiline
            maxRows={1}
            value={msg}
            onChange={handleMsg}
            onKeyPress={handleKeypress}
            disabled={isLoading}
          >
          </TextField>
        </Stack>
      </Grid>
      <Grid xs={1}></Grid>
      <Grid xs={7}>
        <div className='h-140 overflow-auto'>
          <Gallery products={products}/>
        </div>
      </Grid>
    </Grid>
  )
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
      <div className='max-w-8xl w-full items-center font-mono'>
        <Chat/>
      </div>
    </main>
  )
}
