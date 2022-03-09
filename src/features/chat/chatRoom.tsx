import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/auth/authSlice';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { socketChat } from 'socket';

export function ChatRoom() {
  const [room_id, setRoomId] = React.useState('');
  const [name, setName] = React.useState('');
  React.useEffect(() => {
    socketChat.connect();
  }, [])
  const handleJoin =() => {
    socketChat.emit('joinRequest',name, room_id)
  }
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={3} sx={{}}>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              height: 400,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h5" component="h1">
              General
            </Typography>
            <Box>
            <TextField id="outlined-basic" label="Name" variant="outlined"
            value={name} 
            onChange={(e)=>setName(e.target.value)}
            sx={{
              marginBottom: '1rem'
            }}
            />
            <TextField id="outlined-basic" label="Room ID" variant="outlined"
            value={room_id} 
            onChange={(e)=>setRoomId(e.target.value)}
            />
              <br></br>
              <NavLink to="/admin/room">
                <Button color="primary"
                onClick={handleJoin}
                >Join now</Button>
              </NavLink>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </div>
  );
}
