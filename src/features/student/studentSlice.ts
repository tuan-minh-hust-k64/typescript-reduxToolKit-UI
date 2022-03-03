import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { IStudent } from 'model';

export interface studentState {
  listAllStudent: IStudent[];
}

const initialState: studentState = {
  listAllStudent: [],
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    setListAllStudent(state, action: PayloadAction<IStudent[]>) {
      state.listAllStudent = action.payload;
    },
    addStudent(state, action: PayloadAction<IStudent>) {
      state.listAllStudent = [...state.listAllStudent, action.payload];
    },
    removeStudent(state, action: PayloadAction<string>) {
      state.listAllStudent = state.listAllStudent.filter(
        (student) => student._id !== action.payload
      );
    },
  },
});

export const studentAction = studentSlice.actions;

export const selectAllStudent = (state: RootState) => {
  return state.studentReducer.listAllStudent;
};

const studentReducer = studentSlice.reducer;
export default studentReducer;
