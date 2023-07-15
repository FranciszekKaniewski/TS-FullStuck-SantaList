import { Request, Response, Router} from "express";
import {App} from "../index";

export class PresentsRouter {
    public readonly router:Router = Router();

    constructor(
        private app:App
    ) {
        this.setUpRoutes();
    }

    private setUpRoutes(){
        this.router.get('/', this.getPresentsList)
    }

    private getPresentsList = (req:Request,res:Response)=> {
        res.send('<h1>Presents</h1>')
    }
}