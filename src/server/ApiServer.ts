import { Express } from "express";
import express from 'express';
import * as bodyParser from "body-parser"

export default class ApiServer {
    constructor(private app : Express) {
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({extended: true}))
    }

}