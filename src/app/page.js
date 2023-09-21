'use client';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';

import {useEffect, useState} from 'react';

import Image from 'next/image'
import Gallery from './gallery';
import ChatBox from './chat';
import { Button, Stack } from '@mui/material';
import { Refresh } from '@mui/icons-material';


const EmptyProducts = [
  {key: 1, isLoading: true},
  {key: 2, isLoading: true},
  {key: 3, isLoading: true},
  {key: 4, isLoading: true},
]

const WaitingMessages = [
  'Oh, maybe this one...',
  'No, this one won\'t do...',
  'I\'m crunching the numbers, just a moment...',
  'My virtual hamster is running on its wheel to power up my answer generator...',
  'I\'m decoding the secrets of the Promo-verse. Give me a second here...',
  'I\'m consulting the virtual magic eight ball for your answer. Outlook hazy, trying again...',
  'I\'m brewing a potion of wisdom, but the cauldron\'s on low heat...',
  'Hold on, I\'m flipping through my digital Rolodex of witty responses...',
  'My brain cells are doing the electric slide to come up with your answer...',
  'I\'m juggling ones and zeros, trying to create a pixel-perfect answer...',
  'I\'m cooking up a batch of answers, and it\'s simmering at a leisurely pace...',
  'I\'m giving your question the brainpower it deserves...',
  'I\'m in thinking mode right now, stand by...',
]

function randomMessage() {
  return WaitingMessages[Math.floor(Math.random()*(WaitingMessages.length-1))];
}

function Chat() {
  const [msg, setMsg] = useState('');
  const [messages, setMessages]= useState([]);
  const [products, setProducts]= useState([]);
  const [isLoading, setIsLoading]= useState(false);
  const [intId, setIntervalId] = useState({});
  const [conversation, setConversation] = useState([]);

  useEffect(()=> {
    function waitingMessages(){
      setMessages(prevState=> {
        return [...prevState.filter((msg)=>!msg.isLoading)]
      })
      addMessage({
        message: randomMessage(),
        isLoading: false,
        type: 'system',
      });
      addMessage({
        isLoading: true,
        type: 'system',
      });
    }
    if (isLoading){
      const intervalId = setInterval(waitingMessages, 2500);
      setIntervalId(({intervalId}));
    }
    if (!isLoading) {
      clearInterval(intId.intervalId);
    }
  }, [isLoading]);

  function addToConversation(question) {
    setConversation(prevState => {
      return [...prevState, question]
    })
  }

  function addMessage(message) {
    setMessages(prevState => {
      return [...prevState, {
        ...message,
        key: prevState.length,
      }]
    });
  }

  function handleMsg(e) {
    setMsg(e.target.value)
  }

  function handleReset() {
    setMsg('');
    setMessages([]);
    addMessage({
      message: 'Alright, let\'s try something new!',
      isLoading: false,
      type: 'system',
    });
    setConversation([]);
    setProducts([]);
  }

  function handleKeypress(e) {
    if (e.charCode == 13) {
      // New Conversation
      if (conversation.length == 0) {
        setProducts(EmptyProducts);
        setMsg('');
        addMessage({
          message: msg,
          isLoading: false,
          type: 'user',
        });
        addMessage({
          message: 'Okay! Let me look and see what I can find...',
          isLoading: false,
          type: 'system',
        });
        addMessage({
          isLoading: true,
          type: 'system',
        });
        setIsLoading(true);
        fetch('https://pshackathon23.azurewebsites.net/api/Product/EventPost?' + new URLSearchParams({
          eventDescription: msg,
        }), {
          method: 'POST',
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
          }
        }).then((response)=> response.json())
          .then((data)=> {
            setMessages(prevState=> {
              return [...prevState.filter((msg)=>!msg.isLoading)]
            })
            if (data.products && data.products.length > 0) {
              addMessage({
                message: 'Take a look at what I found!',
                isLoading: false,
                type: 'system',
              });
              //console.log(data);
              let key = 0;
              const cleanData = data.products.map((prod)=> {
                return {
                  key: key++,
                  name: prod.name,
                  supplier: prod.vendor,
                  img: prod.imageUrl,
                  //img: 'https://picsum.photos/200/',
                  price: prod.price,
                  description: prod.description,
                  eventDesc: prod.eventSpecificDescription,
                }
              })
              //console.log(cleanData);
              addToConversation({
                isQuestion: true,
                text: data.question
              });
              addToConversation({
                isQuestion: false,
                text: data.answer,
              });
              setProducts(cleanData);
              setIsLoading(false);
            } else {
              addMessage({
                message: 'Hmm, I couldn\'t find anything that matched what you were asking, could you try again?',
                type: 'system',
                isLoading: false,
              })
              setIsLoading(false);
              setProducts([]);
            }
          })
      } else {
        // Continue Conversation
        setProducts(EmptyProducts);
        setMsg('');
        addMessage({
          message: msg,
          isLoading: false,
          type: 'user',
        });
        addMessage({
          message: 'Got it! Let me look into that...',
          isLoading: false,
          type: 'system',
        });
        addMessage({
          isLoading: true,
          type: 'system',
        });
        setIsLoading(true);
        fetch('https://pshackathon23.azurewebsites.net/api/Product/RefinedPost', {
          method: 'POST',
          body: JSON.stringify({
            refiningQuestion: msg,
            chatLog: conversation,
          }),
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
          }
        }).then((response)=> response.json())
          .then((data)=> {
            setMessages(prevState=> {
              return [...prevState.filter((msg)=>!msg.isLoading)]
            })
            //console.log(data);
            if (data.products && data.products.length > 0) {
              addMessage({
                message: 'Take a look at what I found!',
                isLoading: false,
                type: 'system',
              });
              let key = 0;
              const cleanData = data.products.map((prod)=> {
                return {
                  key: key++,
                  name: prod.name,
                  supplier: prod.vendor,
                  img: prod.imageUrl,
                  //img: 'https://picsum.photos/200/',
                  price: prod.price,
                  description: prod.description,
                  eventDesc: prod.eventSpecificDescription,
                }
              })
              //console.log(cleanData);
              setConversation(data.chatLog);
              setProducts(cleanData);
              setIsLoading(false);
            } else {
              addMessage({
                message: 'Hmm, I couldn\'t find anything that matched what you were asking, could you try again?',
                type: 'system',
                isLoading: false,
              })
              setIsLoading(false);
              setProducts([]);
            }
          })
      }
    }   
  }

  return(
    <Grid container spacing={0} disableEqualOverflow sx={{alignItems: 'center'}}>
      <Grid xs={4}>
        <Stack>
          <div className='h-128 overflow-auto'>
            <ChatBox messages={messages}/>
          </div>
          <Grid container spacing={1} sx={{alignItems: 'center'}}>
            <Grid xs>
              <TextField
                sx={{textarea: {color: 'white'}}}
                id="outlined-basic"
                label=""
                variant="outlined"
                focused
                autoFocus
                fullWidth
                multiline
                maxRows={1}
                value={msg}
                onChange={handleMsg}
                onKeyPress={handleKeypress}
                disabled={isLoading}
              >
              </TextField>
            </Grid>
            {isLoading || conversation.length < 1 ? '':
              <Grid xs={1} classes="align-middle">
                <Button
                  variant="text"
                  onClick={handleReset}
                >
                  <Refresh sx={{alignSelf: 'center', fontSize: 30}}/>
                </Button>
              </Grid>
            }
          </Grid>
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
              height={100}
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
