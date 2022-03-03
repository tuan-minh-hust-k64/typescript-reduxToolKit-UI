import { IListParams, IListResponse, IStudent } from 'model';
import axiosClient from './axiosClient';

const studentAPI = {
  getAllStudent(params: IListParams): Promise<IStudent[]> {
    const url = '/student';
    return axiosClient.get(url, { params, withCredentials: true });
  },

  getStudentByID(id: string): Promise<IStudent> {
    const url = `/students/${id}`;
    return axiosClient.get(url);
  },
  updateStudent(data: IStudent): Promise<IStudent> {
    const url = '/students';
    return axiosClient.patch(url, data);
  },
  addStudent(data: IStudent): Promise<IStudent> {
    const url = '/student';
    return axiosClient.post(url, data,{
      withCredentials: true,
    });
  },
  removeStudent(id: string): Promise<any> {
    const url = `/student/${id}`;
    return axiosClient.delete(url,{
      withCredentials: true,
    });
  },
  getHigestMark(): Promise<IStudent[]> {
    const url = '/student?page=1&size=5&sortBy=mark:desc';
    return axiosClient.get(url, {
      withCredentials: true,
    });
  },
  getLowestMark(): Promise<IStudent[]> {
    const url = '/student?page=1&size=5&sortBy=mark:asc';
    return axiosClient.get(url, {
      withCredentials: true,
    });
  },
  getRankStudentByCity(city: string): Promise<IStudent[]> {
    const url = `/student?page=1&size=5&sortBy=mark:desc&city=${city}`;
    return axiosClient.get(url, {
      withCredentials: true,
    });
  },
};
export default studentAPI;
