import { Box, Paper, Skeleton, Stack } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import {styled} from '@mui/material/styles';
import { useEffect, useRef } from 'react';


export default function ChatBox(props){
  const messagesEndRef = useRef(null);

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
  }

  useEffect(()=> {
    scrollToBottom();
  }, [props.messages])

  if (props.messages.length<1) {
    props.messages.push({
      key: 0,
      message: 'Hi there, let me know what type of event, situation or products you are looking to find!',
      isLoading: false,
      type: 'system',
    })
  }
  return (
      <Stack sx={{
        maxHeight: '300',
        overflow: 'auto',
      }} >
    {props.messages ? props.messages.map( msg => (
      <Message message={msg.message} isLoading={msg.isLoading} key={msg.key} type={msg.type}/>
    )): ''}
      <div ref={messagesEndRef}/>
      </Stack>
  )

}

const MessagePaper = styled(Paper)(({ theme })=>({
  backgroundColor: '#232323',
  border: '1px solid #333',
  color: 'white',
  padding: theme.spacing(2),
  ...theme.typography.body1,
  textAlign: 'left',
}))

const UserPaper = styled(Paper)(({ theme })=>({
  backgroundColor: '#101010',
  border: '1px solid #111',
  color: 'white',
  padding: theme.spacing(2),
  ...theme.typography.body1,
  textAlign: 'left',
}))

function Message(props){
  return(
    <Box sx={{
      width: '100%',
      p: 1,
    }}>
      { props.isLoading ?
        <Grid container>
          <Grid xs>
            <Skeleton sx={{bgcolor: '#181818'}}variant="rounded" height={30}/>
          </Grid>
          <Grid xs={2}>
          </Grid>
        </Grid>
        :
        props.type == 'user' ? 
        <Grid container>
          <Grid xs={2}>
          </Grid>
          <Grid xs>
            <UserPaper elevation={6} variant="elevation" >
              {props.message}
            </UserPaper>
          </Grid>
        </Grid>
         :
        <Grid container>
          <Grid xs>
            <MessagePaper elevation={6} variant="elevation" >{props.message}</MessagePaper>
          </Grid>
          <Grid xs={2}>
          </Grid>
        </Grid>
      }
    </Box>
  )
}
