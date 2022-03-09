import {
  Avatar,
  Button,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popover,
  TextField,
  Typography,
} from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { Box } from '@mui/system';
import { IPost } from 'model';
import * as React from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/auth/authSlice';
import AddCommentIcon from '@mui/icons-material/AddComment';
import SendIcon from '@mui/icons-material/Send';
import commentAPI from 'api/commentAPI';
import { showSuccessToast } from 'util/displayToastMess';
import { Comment } from './comment';
import commentReducer from './reducer/commentReducer';
import { socketPost } from 'socket';
export interface IAppProps {
  post: IPost;
  handleDeletePost: (id: string) => void;
}

export function DetailPost(props: IAppProps) {
  const authState = useAppSelector(selectCurrentUser);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [showComment, setShowComment] = React.useState(false);
  const [state, dispatch] = React.useReducer(commentReducer, []);
  const [newComment, setNewComment] = React.useState('');

  React.useEffect(() => {
    initComment();
    socketPost.on('newComment', (comment, postId, userName, auth) => {
      if(postId === props.post._id){
        dispatch({
          type:'ADD_COMMENT',
          data:{
            content: comment,
            user: userName,
            post: postId
          }
        })
      }
    })
  }, []);
  const initComment = async () => {
    const comments = await commentAPI.getComments(props.post._id);
    dispatch({
      type: 'SET_COMMENT',
      data: comments,
    });
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAddComment = async () => {
    setNewComment('');
    try {
      showSuccessToast({
        message: 'Đang tải bình luận lên...',
        time: 2000,
        title: 'Loading...',
        type: 'success',
      });
      setTimeout(async () => {
        const comment = await commentAPI.addComment({
          content: newComment,
          user: authState.email,
          post: props.post._id,
        }, props.post.auth);
        socketPost.emit('sendComment', comment.content, comment.post, comment.user, props.post.auth);
        dispatch({
          type: 'ADD_COMMENT',
          data: comment,
        });
        showSuccessToast({
          message: 'Bình luận thành công!',
          time: 2000,
          title: 'Success',
          type: 'success',
        });
      }, 2000);
    } catch (err) {
      showSuccessToast({
        message: 'Có lỗi gì đó xảy ra, vui lòng thử lại!',
        time: 2000,
        title: 'Warning',
        type: 'error',
      });
    }
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <div
      style={{
        marginBottom: '1rem',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 2,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ bgcolor: deepOrange[500], marginRight: 1 }}>N</Avatar>
            <span>{props.post.auth}</span>
          </div>
          {authState.email === props.post.auth && (
            <div>
              <Button onClick={handleClick}>
                <MoreHorizIcon />
              </Button>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <Button sx={{ p: 2 }} onClick={() => props.handleDeletePost(props.post._id)}>
                  Delete this post
                </Button>
              </Popover>
            </div>
          )}
        </Box>
        <Typography variant="h4" component="h2" sx={{ p: 2 }}>
          {props.post.title}
        </Typography>
        <Box>{props.post.body}</Box>
        <Box>
          <ListItem
            disablePadding
            sx={{
              width: 45,
              marginTop: 3,
            }}
          >
            <ListItemButton onClick={() => setShowComment(!showComment)}>
              <ListItemIcon>
                <AddCommentIcon />
              </ListItemIcon>
              <ListItemText primary="Comment" />
            </ListItemButton>
          </ListItem>
        </Box>
      </Paper>
      {showComment ? (
        <Paper
          elevation={3}
          sx={{
            marginTop: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              padding: 2.5,
            }}
          >
            <TextField
              label="Comment..."
              sx={{
                width: '80%',
              }}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button onClick={handleAddComment}>
              <SendIcon />
            </Button>
          </Box>
          <Box
            sx={{
              padding: 2.5,
            }}
          >
            {state.map((comment, index) => {
              return (
                <div key={index}>
                  <Comment  comment={comment} />
                  <hr />
                </div>
              );
            })}
          </Box>
        </Paper>
      ) : null}
    </div>
  );
}
