import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import studentAPI from 'api/studentAPI';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { IStudent } from 'model';
import * as React from 'react';
import {
  dashboardAction,
  selectCityList,
  selectHighestStudentList,
  selectLowestStudentList,
  selectRankingByCityList,
} from './dashBoardSlice';

export function DashBoard() {
  const cityList = useAppSelector(selectCityList);
  const highestStudentList = useAppSelector(selectHighestStudentList);
  const lowestStudentList = useAppSelector(selectLowestStudentList);
  const rankingByCityList = useAppSelector(selectRankingByCityList);
  const [city, setCity] = React.useState('Nam Dinh');
  const dispatch = useAppDispatch();
  const handleSelectCity = async (event: SelectChangeEvent) => {
    setCity(event.target.value);
    const newList: IStudent[] = await studentAPI.getRankStudentByCity(event.target.value);
    dispatch(dashboardAction.setRankingByCityList(newList));
  };

  return (
    <div>
      <Grid
        container
        spacing={2}
        sx={{
          padding: 2,
        }}
      >
        <Grid item xs={6}>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" component="h1">
              Top 5 Highest Mark
            </Typography>
            <Box
              sx={{
                width: '100%',
              }}
            >
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Age</TableCell>
                      <TableCell align="right">Gender</TableCell>
                      <TableCell align="right">Mark</TableCell>
                      <TableCell align="right">City</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {highestStudentList.map((student, index) => (
                      <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {student.name}
                        </TableCell>
                        <TableCell align="right">{student.age}</TableCell>
                        <TableCell align="right">{student.gender}</TableCell>
                        <TableCell align="right">{student.mark}</TableCell>
                        <TableCell align="right">{student.city}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" component="h1">
              Top 5 Lowest Mark
            </Typography>
            <Box
              sx={{
                width: '100%',
              }}
            >
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Age</TableCell>
                      <TableCell align="right">Gender</TableCell>
                      <TableCell align="right">Mark</TableCell>
                      <TableCell align="right">City</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {lowestStudentList.map((student, index) => (
                      <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {student.name}
                        </TableCell>
                        <TableCell align="right">{student.age}</TableCell>
                        <TableCell align="right">{student.gender}</TableCell>
                        <TableCell align="right">{student.mark}</TableCell>
                        <TableCell align="right">{student.city}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Paper
            elevation={3}
            sx={{
              width: '50%',
              height: 454,
              padding: 2,
            }}
          >
            <Typography variant="h5" component="h1">
              Top 5 Highest Mark By City
            </Typography>
            <Box sx={{ width: 120, marginBottom: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">City</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={city}
                  onChange={handleSelectCity}
                  label="City"
                >
                  {cityList.map((city, index) => {
                    return (
                      <MenuItem value={city.name} key={index}>
                        {city.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
            <Box>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Age</TableCell>
                      <TableCell align="right">Gender</TableCell>
                      <TableCell align="right">Mark</TableCell>
                      <TableCell align="right">City</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rankingByCityList.map((student, index) => (
                      <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {student.name}
                        </TableCell>
                        <TableCell align="right">{student.age}</TableCell>
                        <TableCell align="right">{student.gender}</TableCell>
                        <TableCell align="right">{student.mark}</TableCell>
                        <TableCell align="right">{student.city}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
