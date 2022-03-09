import { Dashboard, PeopleTwoTone } from '@mui/icons-material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ChatIcon from '@mui/icons-material/Chat';
import PostAddIcon from '@mui/icons-material/PostAdd';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

export function SideBar() {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
          <NavLink to="/admin" style={{textDecoration: 'none', color: 'inherit'}} >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
          </NavLink>
          <NavLink to="/admin/student" style={{textDecoration: 'none', color: 'inherit'}}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PeopleTwoTone />
                </ListItemIcon>
                <ListItemText primary="Student" />
              </ListItemButton>
            </ListItem>
          </NavLink>
          <NavLink to="/admin/chat" style={{textDecoration: 'none', color: 'inherit'}}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ChatIcon />
                </ListItemIcon>
                <ListItemText primary="Chat Room" />
              </ListItemButton>
            </ListItem>
          </NavLink>
          <NavLink to="/admin/post" style={{textDecoration: 'none', color: 'inherit'}}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PostAddIcon />
                </ListItemIcon>
                <ListItemText primary="Posts" />
              </ListItemButton>
            </ListItem>
          </NavLink>
        </List>
      </nav>
    </Box>
  );
}
