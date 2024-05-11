import { Express } from "express";
import * as bodyParser from "body-parser"

export default class ApiServer {
    constructor(private app : Express) {
      
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({extended: true}))
        this.app.listen(3380,()=> {
            console.log('Server is running on port 3380')
        })
    }

}