import { IComment } from "model";
import axiosClient from "./axiosClient";

const commentAPI = {
    getComments(id: string): Promise<IComment[]> {
        const url = `/comment/${id}`;
        return axiosClient.get(url, {
            withCredentials: true,
        });
    },
    addComment(comment: IComment, auth: string): Promise<IComment> {
        const url = '/comment';
        return axiosClient.post(url,{comment, auth}, {
            withCredentials: true,
        })
    },
    removeComment(id: string): Promise<IComment> {
        const url = `/comment/${id}`;
        return axiosClient.delete(url, {
            withCredentials: true,
        })
    }
}
export default commentAPI;