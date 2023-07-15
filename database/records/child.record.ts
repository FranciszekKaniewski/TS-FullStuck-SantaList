import {pool} from "../utils/pool";
import {Kid} from "../../types";
import {v4 as uuid} from 'uuid'
import {FieldPacket} from "mysql2";


type PresentResult = [Kid[],FieldPacket[]]

export class KidRecord implements Kid{
    id: string;
    name: string;
    toy: string;

    constructor(obj:Kid) {
        this.id = obj.id;
        this.name = obj.name;
        this.toy = obj.toy ?? null;
    };

    private Validation (){

    };

    public static async getAll():Promise<Kid[]>{
        const [results] = (await pool.execute("SELECT * FROM `presents`") as PresentResult);

        return results;
    };
}