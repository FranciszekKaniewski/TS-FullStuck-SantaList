import {pool} from "../utils/pool";
import {Present} from "../../types";
import {v4 as uuid} from 'uuid'
import {FieldPacket} from "mysql2";


type PresentResult = [Present[],FieldPacket[]]

export class PresentRecord implements Present{
    id?:string;
    name:string;
    count:number;

    constructor(obj:Present) {
        this.id = obj.id ?? uuid();
        this.name = obj.name;
        this.count = obj.count;
    };

    private Validation (){

    };

    public static async getAll():Promise<Present[]>{
        const [results] = (await pool.execute("SELECT * FROM `presents`") as PresentResult);

        return results;
    };
}