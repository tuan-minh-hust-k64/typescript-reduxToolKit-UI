import { IPost } from "model";
import axiosClient from "./axiosClient";

const postAPI = {
    getPost(): Promise<IPost[]>{
        const url = '/post';
        return axiosClient.get(url, {
            withCredentials: true,
        });
    },
    addPost(data: IPost): Promise<IPost>{
        const url = '/post';
        return axiosClient.post(url, data, {
            withCredentials: true,
        })
    },
    removePost(id: string): Promise<IPost>{
        const url = `/post/${id}`;
        return axiosClient.delete(url, {
            withCredentials: true,
        })
    }
}
export default postAPI;