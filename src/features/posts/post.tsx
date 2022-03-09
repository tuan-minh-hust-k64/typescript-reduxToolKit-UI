import AddIcon from '@mui/icons-material/Add';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import {
  Avatar,
  Grid,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Paper,
  Popover,
  Typography,
} from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { Box } from '@mui/system';
import postAPI from 'api/postAPI';
import { useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/auth/authSlice';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import socket, { socketPost } from 'socket';
import { showSuccessToast } from 'util/displayToastMess';
import { DetailPost } from './detailPost';
import postReducer from './reducer/postReducer';
import CampaignIcon from '@mui/icons-material/Campaign';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  height: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  backgroundColor: '#fff',
};

export function Post() {
  const [open, setOpen] = React.useState(false);
  const authState = useAppSelector(selectCurrentUser);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [state, dispatch] = React.useReducer(postReducer, {
    posts: [],
    userOnline: [],
    notifications: [],
  });

  React.useEffect((): VoidFunction => {
    initPosts();
    dispatch({
      type: 'SET_NOTIFICATION',
      data: authState.notifications,
    });
    socketPost.connect();
    socketPost.emit('joinPost', authState.email);
    socketPost.on('resJoinedPost', (users) => {
      dispatch({
        type: 'SET_USER_ONLINE',
        data: users,
      });
    });
    socketPost.on('newComment', (comment, postId, userName, auth) => {
      if (auth === authState.email) {
        dispatch({
          type: 'ADD_NOTIFICATION',
          data: {
            content: `${userName} đã bình luận bài viết của bạn`,
            new: true,
            postId,
          },
        });
        console.log('jksakd')
      }
    });
    return () => socketPost.disconnect();
  }, []);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseNotifi = () => {
    setAnchorEl(null);
  };

  const openNotifi = Boolean(anchorEl);
  const id = openNotifi ? 'simple-popover' : undefined;

  const initPosts = async () => {
    const posts = await postAPI.getPost();
    dispatch({
      type: 'SET_POST',
      data: posts,
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    showSuccessToast({
      message: 'Vui lòng chờ trong giây lát',
      time: 2000,
      title: 'Loading...',
      type: 'success',
    });
    setOpen(false);
    setTimeout(async () => {
      const newPost = await postAPI.addPost({
        title: data.Title,
        body: data.Content,
        commentCount: 0,
        auth: authState.email,
      });
      dispatch({
        type: 'ADD_POST',
        data: newPost,
      });
      showSuccessToast({
        message: 'Post thành công',
        time: 2000,
        title: 'Thành công',
        type: 'success',
      });
    }, 3000);
    reset();
  };
  const handleDeletePost = (id: string) => {
    try {
      showSuccessToast({
        message: 'Đang xóa...',
        time: 2000,
        title: 'Loading...',
        type: 'success',
      });
      setTimeout(async () => {
        const comment = await postAPI.removePost(id);
        dispatch({
          type: 'REMOVE_POST',
          data: id,
        });
        showSuccessToast({
          message: 'Xóa bài đăng thành công!',
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
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <ListItem
            disablePadding
            sx={{
              width: 45,
            }}
          >
            <ListItemButton onClick={handleOpen}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="New" />
            </ListItemButton>
          </ListItem>
        </div>
        <div>
          <ListItem>
            <IconButton onClick={handleClick}>
              <NotificationsActiveIcon />
            </IconButton>
            <Popover
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              id={id}
              open={openNotifi}
              anchorEl={anchorEl}
              onClose={handleCloseNotifi}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <Paper elevation={3}>
                <Box>
                  {state.notifications.map((item, index) => {
                    return (
                      <div
                        key={index}
                        style={{
                          padding: '.3rem',
                        }}
                      >
                        <ListItem disablePadding>
                          <ListItemButton>
                            <ListItemIcon>
                              <CampaignIcon />
                            </ListItemIcon>
                            <ListItemText primary={item.content} />
                          </ListItemButton>
                        </ListItem>
                      </div>
                    );
                  })}
                </Box>
              </Paper>
            </Popover>
          </ListItem>
        </div>
      </div>

      <hr />
      <Grid container spacing={2}>
        <Grid item xs={9}>
          {state.posts.map((post, index) => {
            return <DetailPost key={index} post={post} handleDeletePost={handleDeletePost} />;
          })}
        </Grid>
        <Grid item xs={3}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              p: 2,
            }}
          >
            <div>User Online</div>
            {state.userOnline.map((user, index) => {
              return (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '.75rem 0',
                  }}
                >
                  <Avatar sx={{ bgcolor: deepOrange[500], marginRight: 1 }}>N</Avatar>
                  <span>{user.user_name}</span>
                </div>
              );
            })}
          </Box>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Post
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Title"
              {...register('Title', { required: true })}
              style={{
                width: '70%',
                padding: '1rem 1rem',
                marginBottom: '1rem',
              }}
            />
            <br />
            <textarea
              {...register('Content', { required: true })}
              style={{
                width: '70%',
                padding: '1rem 1rem',
                marginBottom: '1rem',
                height: '200px',
              }}
            />
            <br />
            <input
              type="submit"
              style={{
                border: 'none',
                padding: '1rem 2rem',
                backgroundColor: '#007bff',
              }}
            />
          </form>
        </Box>
      </Modal>
    </div>
  );
}
