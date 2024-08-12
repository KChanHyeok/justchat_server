import http  from "http";
import ws, { WebSocket, WebSocketServer } from 'ws'

export default class SocketServer {
        public wss: ws.WebSocketServer
        public clinets: any[] = [] ;
        constructor(server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>) {
            this.wss = new ws.WebSocketServer({server})
            
            // setInterval(()=> {
            //     console.log(`현재 접속중인 인원 ${this.clinets.length}명`)
            // },10000)
        }

        start () {
            this.wss.on('connection', (ws: WebSocket, req: any) => {
                const {member_id, channer_no} = req.headers
                this.clinets.push({ws, member_id, channer_no})
                console.log(`ID: ${member_id} 접속`)
                // this.clinets.push(ws.terminate())
                ws.on('message', (message: any) => {
                    this.clinets.map(((client:any)=>{
                        if(client.channer_no === channer_no){
                            console.log(req.headers)
                            const msg:any = JSON.parse(message)
                            if(member_id){
                                msg.member_id = member_id
                            }else {
                                // msg.member_id = req.headers.cookie.member_id
                            }
                            console.log(`${member_id}: ${JSON.stringify(msg)}`)
                            client.ws.send(JSON.stringify(msg), (err:any)=> err &&console.log(err))
                        }
                    }))
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