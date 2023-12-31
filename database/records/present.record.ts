import {pool} from "../utils/pool";
import {Present} from "../../types";
import {v4 as uuid} from 'uuid'
import {FieldPacket, ResultSetHeader} from "mysql2";
import {ValidationError} from "../../utils/error";


type PresentResult = [Present[],FieldPacket[]]

export class PresentRecord implements Present{
    id?:string;
    name:string;
    value:number;

    constructor(obj:Present) {
        this.id = obj.id ?? uuid();
        this.name = obj.name;
        this.value = obj.value;
    };

    public async Validation (){
        if(this.name.length < 2 || this.name.length > 20 ||  !this.name){
            throw new ValidationError("Present name have to be between 2 and 20 characters!")
        }

        if((await PresentRecord.getAll()).filter(e=>e.name === this.name && e.id !== this.id).length){
            throw new ValidationError("Name must be unique!")
        }

        if(this.value < 0){
            throw new ValidationError(`You have not more ${this.name} present in your magazine!`)
        }
    };

    // Functions
    static async getAll():Promise<Present[]>{
        const [results] = (await pool.execute("SELECT * FROM `presents`") as PresentResult);

        return results.map(obj=>new PresentRecord(obj));
    };

    static async getOne(id:string):Promise<PresentRecord|null>{
        const [results] = await pool.execute("SELECT * FROM `presents` WHERE `id` = :id",{
            id,
        }) as PresentResult

        return results.length > 0 ? new PresentRecord(results[0]) : null
    }

    async update():Promise<void>{
        await this.Validation();
        console.log(`${this.name} (${this.id}) has been updated!`)
        await pool.execute("UPDATE `presents` SET `name`= :name,`value`= :value WHERE id = :id",{
            id: this.id,
            name:this.name,
            value:this.value,
        });
    }

    async add():Promise<void>{
        await this.Validation()
        console.log(`${this.name} (${this.id}) has been added!`)
        await pool.execute("INSERT INTO `presents`(`name`, `value`) VALUES (:name,:value)",{
            name:this.name,
            value:this.value,
        })
    }

    async delete():Promise<void>{
        console.log(`${this.name} (${this.id}) has been deleted!`)
        await pool.execute("DELETE FROM `presents` WHERE `id` = :id",{
            id:this.id,
        })
    }
}