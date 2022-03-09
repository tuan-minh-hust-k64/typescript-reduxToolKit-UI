import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useEffect, useReducer, useState } from 'react';
import { socketChat } from 'socket';
import $ from 'jquery';
import roomReducer from './roomReducer';

export function Room() {
  const [roomID, setRoomID] = useState('');
  const [userName, setUserName] = useState('');
  const [textMess, setTextMess] = useState('');
  const [state, dispatch] = useReducer(roomReducer, []);

  useEffect((): VoidFunction => {
    socketChat.on('messageAuto', (message, roomId, userName) => {
      setRoomID(roomId);
      setUserName(userName);
      dispatch({
        type: 'ADD_MESS',
        data: {
          message,
          type: 'auto',
        },
      });
      // $('.box-mess').append(`<div class="auto-message" >${message} </div>`);
    });
    socketChat.on('newJoin', (message) => {
      dispatch({
        type: 'ADD_MESS',
        data: {
          message,
          type: 'auto',
        },
      });
      // $('.box-mess').append(`<div class="auto-message">${message}</div>`);
    });
    socketChat.on('newMessage', (message, userName) => {
      dispatch({
        type: 'ADD_MESS',
        data: {
          message,
          type: 'mess',
          userName,
        },
      });
      // $('.box-mess').append(`
      // <div class='mg-1'>
      //   <span class='mg-1'>${userName}</span>
      //   <br/>
      //   <div class="message">${message}</div>
      // </div>`);
    });
    return () => {
      // socketChat.off('messageAuto');
      // socketChat.off('newMessage');
      socketChat.disconnect();
    };
  }, []);
  const renderMess = () => {
    socketChat.emit('sendMessage', textMess, userName, roomID);
    setTextMess('');
  };
  return (
    <div>
      <Paper
        elevation={1}
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
        }}
      >
        <Box
          sx={{
            height: '85vh',
          }}
          className="box-mess"
        >
          {state.map((item, index) => {
            if (item.type === 'auto') {
              return <div className="auto-message">{item.message}</div>;
            }
            return (
              <div className="mg-1">
                <span className="mg-1">{item.userName}</span>
                <br />
                <div className="message">{item.message}</div>
              </div>
            );
          })}
        </Box>
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            right: 0,
            left: 310,
            display: 'flex',
          }}
        >
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            sx={{
              width: '90%',
            }}
            value={textMess}
            onChange={(e) => setTextMess(e.target.value)}
          />
          <Button color="primary" onClick={renderMess}>
            Send
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
