export interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    addStudent:(success: boolean) => void;
  }
  
 export  interface ClientToServerEvents {
    hello: () => void;
    addStudents: () => void;
  }
  