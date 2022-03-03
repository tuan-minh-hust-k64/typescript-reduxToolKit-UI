import { ClientToServerEvents, ServerToClientEvents } from 'model';
import {io, Socket} from 'socket.io-client';
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('http://localhost:8080',{
    withCredentials: true,
}); 
export default socket;