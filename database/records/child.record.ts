import {pool} from "../utils/pool";
import {Kid} from "../../types";
import {v4 as uuid} from 'uuid'
import {FieldPacket} from "mysql2";

type KidResult = [Kid[],FieldPacket[]]

export class KidRecord implements Kid{
    id: string;
    name: string;
    toyId: string;

    constructor(obj:Kid) {
        this.id = obj.id;
        this.name = obj.name;
        this.toyId = obj.toyId ?? null;
    };

    private Validation (){

    };


    //Functions
    static async getAll():Promise<Kid[]>{
        const [results] = (await pool.execute("SELECT * FROM `kids`") as KidResult);

        return results.map(obj=>new KidRecord(obj));
    };

    static async getOne(id:string):Promise<KidRecord|null>{
        const [results] = await pool.execute("SELECT * FROM `kids` WHERE `id` = :id",{
            id,
        }) as KidResult

        return results.length > 0 ? new KidRecord(results[0]) : null
    }

    async updateToy():Promise<void>{
        console.log(`${this.name} (${this.id}) has change toy!`)

        await pool.execute("UPDATE `kids` SET `toyId`= :toyId WHERE `id` = :id",{
            id: this.id,
            toyId:this.toyId,
        });
    }
}