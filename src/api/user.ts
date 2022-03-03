import { ICity, IUser } from 'model';
import axiosClient from './axiosClient';

const userAPI = {
  login(payload: IUser): Promise<IUser | any> {
    const url = '/login';
    return axiosClient.post(url, payload,
      {
        withCredentials: true,
      });
  },
  checkLogin(): Promise<Object> {
    const url = '/checkLogin';
    return axiosClient.post(url,{},{
      withCredentials: true,
    })
  },
  logout(): Promise<any> {
    const url = '/logout';
    return axiosClient.delete(url,{
      withCredentials: true,
    })
  }
};
export default userAPI;
