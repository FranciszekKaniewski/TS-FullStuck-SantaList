import { Request, Response, Router} from "express";
import {App} from "../index";
import {PresentRecord} from "../database/records/present.record";
import {ValidationError} from "../utils/error";
import {Present} from "../types";

export class PresentsRouter {
    public readonly router:Router = Router();

    constructor(
        private app:App
    ) {
        this.setUpRoutes();
    }

    private setUpRoutes(){
        this.router.get('/', this.getPresentsList)
        this.router.post('/', this.addPresent)
        this.router.put('/', this.updatePresent)
        this.router.delete('/', this.deletePresent)
        this.router.put('/many',this.updateMany)
    }

    //Routes
    private getPresentsList = async (req:Request,res:Response)=> {
        const presentsList = await PresentRecord.getAll();
        res.json(presentsList);
    }
    private addPresent = async (req:Request,res:Response)=>{
        console.log(req.body)
        const newPresent = new PresentRecord(req.body);

        await newPresent.add();
        res.end();
    }
    private updatePresent = async (req:Request,res:Response)=>{
        const presentToUpdateId = req.body.id
        const presentToUpdate = await PresentRecord.getOne(presentToUpdateId);

        if(!presentToUpdate) throw new ValidationError(`Nie znaleziono dziecka o id: ${presentToUpdateId}`)

        presentToUpdate.name = req.body.name;
        presentToUpdate.value = req.body.value;

        await presentToUpdate.update()
        res.end();
    }
    private deletePresent = async (req:Request,res:Response)=>{
        const presentToDeleteId = req.body.id
        const presentToDelete = await PresentRecord.getOne(presentToDeleteId);

        if(!presentToDeleteId) throw new ValidationError(`Nie znaleziono dziecka o id: ${presentToDeleteId}`)

        await presentToDelete.delete();
        res.end();
    }
    private updateMany = async (req:Request,res:Response)=>{
        const allPresentsToUpdate:Present[] = req.body

        console.log(`-------------- Update Many Presents --------------`)
        const presentsRecordsToUpdate = allPresentsToUpdate.map(async present=>{

            const presentToUpdate = await PresentRecord.getOne(present.id);

            if(presentToUpdate.name !== present.name || presentToUpdate.value !== present.value){
                presentToUpdate.name = present.name
                presentToUpdate.value = present.value

                return presentToUpdate
            }
            return null
        })

        try{
            for(const present of presentsRecordsToUpdate){
                (await present) !== null && await (await present).Validation();
            }
        }catch (err){
            throw new ValidationError(err);
        }

        for (const present of presentsRecordsToUpdate) {
            if(await present) {
                await (await present).update()
            }
        }

        res.end();
    }
}