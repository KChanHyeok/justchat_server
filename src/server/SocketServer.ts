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
            this.wss.on('connection', (ws: WebSocket, req: any) => {
                console.log('new connection')
                // console.log(req.headers)
                const {member_id} = req.headers
                this.clinets.push(member_id)
                console.log(`현재 접속중인 인원 ${this.clinets.length}명`)
                // this.clinets.push(ws.terminate())
                ws.on('message', (message: any) => {
                    console.log(`${member_id} - ${message}`)
                })
                ws.on('close', () => {
                    console.log('connection closed')
                    const idx = this.clinets.findIndex((clinet: any) => clinet.id === member_id)
                    this.clinets.splice(idx, 1)
                    console.log(`현재 접속중인 인원 ${this.clinets.length}명`)
                })
            })
        }
        
}