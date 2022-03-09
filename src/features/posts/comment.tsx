import { Avatar } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { IComment } from 'model';
import * as React from 'react';

export interface ICommentProps {
    comment: IComment;
}

export function Comment (props: ICommentProps) {
  return (
    <div style={{
        display: 'flex',
        padding: '0 1rem',
    }} >
      <Avatar sx={{ bgcolor: deepOrange[500], marginRight: 1 }}>N</Avatar>
      <div>
          <span>{props.comment.user}</span>
          <br />
          <span>{props.comment.content}</span>
      </div>
    </div>
  );
}
