import * as express from 'express'
import 'express-async-errors';
import {Application} from "express";

import {KidsRouter} from "./routes/KidsRouter";
import {PresentsRouter} from "./routes/PresentsRouter";

import {handleError} from "./utils/error";


export class App {
    private app: Application;

    constructor() {
        this.configApp();
        this.setRoutes();
        this.run();
        this.loadData();
    }

    private configApp():void{
        this.app = express();

        this.app.use(express.json());

    }

    setRoutes(){
        this.app.use("/kids",new KidsRouter(this).router);
        this.app.use("/presents",new PresentsRouter(this).router);
    }

    run(){
        this.app.use(handleError);
        this.app.listen(3001,'localhost', ()=>{
            console.log('Listening on http://localhost:3001/');
        })
    }

    loadData(){

    }

}

new App();