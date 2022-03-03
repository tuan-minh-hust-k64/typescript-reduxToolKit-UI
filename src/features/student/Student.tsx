import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import studentAPI from 'api/studentAPI';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import * as React from 'react';
import { selectAllStudent, studentAction } from './studentSlice';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function Student() {
  const listAllStudent = useAppSelector(selectAllStudent);
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [age, setAge] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [mark, setMark] = React.useState('');
  const [city, setCity] = React.useState('');
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleDelete = async (id: string) => {
    const { success } = await studentAPI.removeStudent(id);
    if (success) {
      dispatch(studentAction.removeStudent(id));
    } else {
      alert('something went wrong');
    }
  };

  const handleSubmit = async () => {
    const newStudent = await studentAPI.addStudent({
      name: name,
      age: parseInt(age, 10),
      gender,
      mark: parseInt(mark, 10),
      city,
    });
    dispatch(studentAction.addStudent(newStudent));
    setOpen(false);
  };
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" component="h1">
              Class Transcript
            </Typography>
            <Button color="primary" sx={{ float: 'right' }} onClick={handleOpen}>
              Add New
            </Button>
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
                      <TableCell align="right">Option</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {listAllStudent.map((student, index) => (
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
                        <TableCell align="right">
                          <Button color="error" onClick={() => 
                            //@ts-ignore
                            handleDelete(student._id)}>
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Add New Student
                </Typography>
                <FormControl>
                  <TextField
                    label={'Name'}
                    id="margin-dense"
                    margin="dense"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <TextField
                    label={'Age'}
                    id="margin-dense"
                    margin="dense"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                  <TextField
                    label={'Gender'}
                    id="margin-dense"
                    margin="dense"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <TextField
                    label={'Mark'}
                    id="margin-dense"
                    margin="dense"
                    value={mark}
                    onChange={(e) => setMark(e.target.value)}
                  />
                  <TextField
                    label={'City'}
                    id="margin-dense"
                    margin="dense"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <Button color="primary" onClick={handleSubmit}>
                    Submit
                  </Button>
                </FormControl>
              </Box>
            </Modal>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
