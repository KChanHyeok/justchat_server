import { Express } from "express";
import * as bodyParser from "body-parser"
import router from '@src/router'
import { swaggerUi, specs } from "@util/swagger";


const ApiServer = (app: Express) => {
    // constructor(private app : Express) {
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({extended: true}))
        app.use('/', router)
        app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs))
    // this.app.use(bodyParser.json())
        // this.app.use(bodyParser.urlencoded({extended: true}))
        // this.app.use('/', router)
        // this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs))
    }

export default ApiServer
