import { Grid } from '@mui/material';
import { Header, SideBar } from 'components/common';
import * as React from 'react';
import { Outlet } from 'react-router-dom';

export interface AdminProps {}

export function Admin(props: AdminProps) {

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={2}>
        <SideBar />
      </Grid>
      <Grid item xs={10}>
          <Outlet />
      </Grid>
    </Grid>
  );
}
