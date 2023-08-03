import {useEffect, useState} from "react";
import { Present } from "types";
import {SinglePresent} from "../SinglePresent/SinglePresent";
import {Fetch} from "../../utils/Fetch";
import {Color, PopUpDeps} from "../../utils/frontent-types/types";
import {PopUp} from "../common/PopUp/PopUp";

export const PresentsList = () => {

    //State
    const [presentsList,setPresentsList] = useState<null | Present[]>(null)

    const [changedPresentRecords,setChangedPresentRecords] = useState<Present[]>([])

    const [loading,setLoading] = useState(false)
    const [popUp,setPopUp] = useState<null|PopUpDeps>(null);

    useEffect(()=>{
        (async()=>{
            const res = await fetch('http://localhost:3001/presents');
            const data = await res.json();
            setPresentsList(data);
            console.log(data);
        })()
    },[])

    //Loading
    if(presentsList === null || loading){
        return <h1>Loading...</h1>
    }

    //Functions
    const saveHandler = async () =>{

        if(changedPresentRecords.length){
            setLoading(true);
            await Fetch('http://localhost:3001/presents/many',"PUT",presentsList);
            setPopUp({title:'Data saved',description:`${changedPresentRecords.length} record(s) has been updated!`, color:Color.green})

        }else{
            setPopUp({title:'Everythink is updated 🥳!'})
        }
        setChangedPresentRecords([]);
        setLoading(false)
    }

    const changePresentsList = (editedPresent:Present,isChanged:boolean) =>{

        if(isChanged){
            !changedPresentRecords.filter(present => present.id === editedPresent.id).length
            &&
            setChangedPresentRecords(prevState => [...prevState,editedPresent])
        }else{
            const arrayWithoutPresent = changedPresentRecords.filter(present=>present.id !== editedPresent.id)
            setChangedPresentRecords(arrayWithoutPresent)
        }

        const newPresentsList = presentsList.map((present:Present)=>{
                if(present.id === editedPresent.id){
                    return editedPresent
                }else{
                    return present
                }})
        setPresentsList(newPresentsList);
    }

    //render
    const presents = presentsList.map(present=>
        <SinglePresent
            key={present.id}
            id={present.id as string}
            name={present.name}
            value={present.value}
            changePresentsList={changePresentsList}
        />)

    return(
        <>
            {popUp && <PopUp title={popUp.title} color={popUp.color} description={popUp.description} turnOffFn={()=>setPopUp(null)}/>}
            <h1>Presents List</h1>
            <ul>{presents}</ul>
            <button onClick={saveHandler}>Save</button>
        </>
    )
}