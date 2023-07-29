import { Request, Response, Router} from "express";
import {App} from "../index";
import {KidRecord} from "../database/records/child.record";
import {ValidationError} from "../utils/error";
import {Kid} from "../types";

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
        this.router.put('/many', this.updateManyToys)
    }

    //Routes
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

        kidToUpdate.toyId = req.body.toyId

        await kidToUpdate.updateToy();
        res.end();
    }
    private updateManyToys = async (req:Request,res:Response)=>{
        const allKidsToUpdate:Kid[] = req.body

        console.log(`-------------- Update Many Kids --------------`)
        allKidsToUpdate.map(async kid=>{
            const kidToUpdate = await KidRecord.getOne(kid.id);

            if(kidToUpdate.name !== kid.name || kidToUpdate.toyId !== kid.toyId){
                kidToUpdate.name = kid.name
                kidToUpdate.toyId = kid.toyId

                await kidToUpdate.updateToy()
            }
        })
        res.end();
    }
}