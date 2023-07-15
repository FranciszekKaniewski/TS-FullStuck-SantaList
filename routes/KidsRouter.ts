import { Request, Response, Router} from "express";
import {App} from "../index";

export class KidsRouter {
    public readonly router:Router = Router();

    constructor(
        private app:App
    ) {
        this.setUpRoutes();
    }

    private setUpRoutes(){
        this.router.get('/', this.getKidsList)
    }

    private getKidsList = (req:Request,res:Response)=> {
        res.send('<h1>Kids</h1>')
    }
}