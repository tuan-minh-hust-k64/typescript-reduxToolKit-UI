import { ClientToServerEvents, ServerToClientEvents } from 'model';
import {io, Socket} from 'socket.io-client';
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('http://localhost:8080',{
    withCredentials: true,
}); 
export const socketLogin: Socket<ServerToClientEvents, ClientToServerEvents> = io('http://localhost:8080/login',{
    withCredentials: true,
}); 
export const socketStudent: Socket<ServerToClientEvents, ClientToServerEvents> = io('http://localhost:8080/student',{
    withCredentials: true,
}); 
export const socketChat: Socket<ServerToClientEvents, ClientToServerEvents> = io('http://localhost:8080/chat',{
    withCredentials: true
})
export const socketPost: Socket<ServerToClientEvents, ClientToServerEvents> = io('http://localhost:8080/post',{
    withCredentials: true,
})
export default socket;