import { Express, Request, Response } from "express";
import * as bodyParser from "body-parser"
import routers from '@src/routers';
import { swaggerUi, specs } from "@util/swagger";


const ApiServer = (app: Express) => {
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({extended: true}))
        app.use('/', routers)
        app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs))
    }

export default ApiServer
