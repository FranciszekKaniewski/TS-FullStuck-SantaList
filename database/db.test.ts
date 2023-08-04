import {pool} from "./utils/pool";
import {PresentRecord} from "./records/present.record";
import {KidRecord} from "./records/child.record";

(async()=>{

    // // getAll presents
    // const allKids = await KidRecord.getAll()
    // console.log(allKids);

    // // getOne child
    // const child = await KidRecord.getOne('7e7f2c62-d8f3-11ed-b8eb-18c04dda')
    // console.log(child)
    //
    // //Update Toy
    // child.name = ''
    // await child.updateToy();


    // getAll presents
    const allPresents = await PresentRecord.getAll()
    console.log(allPresents);

    //GetOne present
    const onePresent = await PresentRecord.getOne(allPresents[0].id)
    console.log(onePresent)

    // Update One
    onePresent.name = ''
    await onePresent.update();

    // // Add new one
    // const present = new PresentRecord({name:"TEST",value:10})
    // await present.add()

    // // Delete one
    // const testRecordId = (await PresentRecord.getAll()).filter(e=>e.name === "TEST")[0].id
    // const testRecord = await PresentRecord.getOne(testRecordId);
    // await testRecord.delete();

})()
