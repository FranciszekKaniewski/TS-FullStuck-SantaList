import {useEffect, useState} from "react";
import {Kid, Present} from "types";
import {Color, PopUpDeps} from "../../utils/frontent-types/types";
import {SingleKid} from "../SingleKid/SingleKid";
import {Fetch} from "../../utils/Fetch";
import {PopUp} from "../common/PopUp/PopUp";

export const KidsList = () =>{

    //State
    const [kidsList, setKidsList] = useState<null | Kid[]>(null);
    const [presentsList, setPresentsList] = useState<null | Present[]>(null);

    const [changedKidsRecords,setChangedKidsRecords] = useState<Kid[]>([]);

    const [loading,setLoading] = useState(false)
    const [popUp,setPopUp] = useState<null|PopUpDeps>(null);

    //Download Data
    useEffect(()=>{
        (async()=>{

            const res = await fetch('http://localhost:3001/kids');
            const data = await res.json();
            setKidsList(data);
            console.log(data);

        })()
    },[])
    useEffect(()=>{
        (async()=>{

            const res = await fetch('http://localhost:3001/presents');
            const data = await res.json();
            setPresentsList(data);
            console.log(data);

        })()
    },[])

    //Loading
    if(kidsList === null || presentsList === null || loading){
        return <h1>Loading...</h1>
    }

    //Functions
    const changePresentsValues:any = (editedPresent:Present,prevPresetId:string) => {

        const newPresentsArray = presentsList.map(present =>{
            if(present.id === prevPresetId){
                const prevPresent = presentsList.filter(present => present.id === prevPresetId)[0]
                return ({...prevPresent,value:prevPresent.value + 1})
            }
            if(present.id === editedPresent.id){
                return {...editedPresent,value:editedPresent.value - 1}
            }else{
                return present
            }
        })

        setPresentsList(newPresentsArray);
    }

    const changeKidsList = (editedKid:Kid,isChanged:boolean) =>{

        if(isChanged){
            !changedKidsRecords.filter(kid=>kid.id===editedKid.id).length && setChangedKidsRecords(prevState => [...prevState,editedKid])
        }else{
            const arrayWithoutKid = changedKidsRecords.filter(kid=>kid.id!==editedKid.id)
            setChangedKidsRecords(arrayWithoutKid);
        }

        const newKidsArray = kidsList.map(kid=>{
            if(kid.id === editedKid.id){
                return editedKid
            }else{
                return kid
            }
        });
        setKidsList(newKidsArray)
    }

    const saveHandler = async ()=>{
        if(changedKidsRecords.length){
            setLoading(true)
            await Fetch('http://localhost:3001/presents/many',"PUT",presentsList);
            await Fetch('http://localhost:3001/kids/many',"PUT", kidsList);

            setLoading(false)
            setPopUp({title:'Data saved',description:`${changedKidsRecords.length} record(s) has been updated!`, color:Color.green})
        }else{
            setPopUp({title:'Everythink is updated 🥳!'})
        }

        setChangedKidsRecords([]);
    }

    //Render
    const kids =
        kidsList.map(kid=>
            <SingleKid
                key={kid.id}
                kid={kid}
                allToys={presentsList}
                changeKidsList={changeKidsList}
                changePresentsValues={changePresentsValues}
            />)

    return (
        <>
            {popUp && <PopUp title={popUp.title} color={popUp.color} description={popUp.description} turnOffFn={()=>setPopUp(null)}/>}
            <h2>{kids}</h2>
            <button onClick={saveHandler}>Save</button>
        </>
    );
}