import http  from "http";
import ws, { WebSocket, WebSocketServer } from 'ws'

export default class SocketServer {
        public wss: ws.WebSocketServer
        public clinets: any[] = [] ;
        constructor(server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>) {
            this.wss = new ws.WebSocketServer({server})
            
            setInterval(()=> {
                console.log(`현재 접속중인 인원 ${this.clinets.length}명`)
            },10000)
        }

        start () {
            this.wss.on('connection', (ws: WebSocket, params: string) => {
                console.log('new connection')
                console.log(this.wss.clients)
                // this.clinets.push(ws.terminate())
                ws.on('message', (message: any) => {
                    console.log('received: %s', message)
                })
                ws.on('close', () => {
                    console.log('connection closed')
                })
            })
        }
        
}