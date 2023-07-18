import { Request, Response, Router} from "express";
import {App} from "../index";
import {KidRecord} from "../database/records/child.record";
import {ValidationError} from "../utils/error";

export class KidsRouter {
    public readonly router:Router = Router();

    constructor(
        private app:App
    ) {
        this.setUpRoutes();
    }

    private setUpRoutes(){
        this.router.get('/', this.getKidsList)
        this.router.put('/', this.updateToy)
    }

    private getKidsList = async (req:Request,res:Response)=> {
        const kidsList = await KidRecord.getAll();
        res.json(kidsList);
    }
    private updateToy = async (req:Request,res:Response)=>{
        const kidToUpdateId = req.body.id;
        const kidToUpdate = await KidRecord.getOne(kidToUpdateId)

        if(!kidToUpdate){
            throw new ValidationError(`Nie znaleziono dziecka o id: ${kidToUpdateId}`)
            res.end();
        }

        kidToUpdate.toy = req.body.toy

        await kidToUpdate.updateToy();
        res.end();
    }
}