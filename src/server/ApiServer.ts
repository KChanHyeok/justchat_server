import { Express } from "express";
import * as bodyParser from "body-parser"
import router from '../router'
import { swaggerUi, specs } from "../util/swagger";


export default class ApiServer {
    constructor(private app : Express) {
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({extended: true}))
        this.app.use('/', router)
        this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs))
    }


}