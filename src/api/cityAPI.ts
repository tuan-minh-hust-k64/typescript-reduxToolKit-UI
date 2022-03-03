import { ICity } from "model";
import axiosClient from "./axiosClient";

const cityAPI = {
    getCity(): Promise<ICity[]> {
        const url = '/all-city';
        return axiosClient.get(url,{
            withCredentials: true,
        })
    }
}
export default cityAPI;