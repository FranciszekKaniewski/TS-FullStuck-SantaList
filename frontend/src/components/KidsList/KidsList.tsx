import {useEffect, useState} from "react";
import {Kid, Present} from "types";
import {Color, PopUpDeps} from "../../utils/frontent-types/types";
import {SingleKid} from "../SingleKid/SingleKid";
import {Fetch} from "../../utils/Fetch";
import {PopUp} from "../PopUp/PopUp";

export const KidsList = () =>{

    //State
    const [kidsList, setKidsList] = useState<null | Kid[]>(null);
    const [presentsList, setPresentsList] = useState<null | Present[]>(null);

    const [loading,setLoading] = useState(false)

    const [changedKids,setChangedKids] = useState<Kid[]>([])

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
    const changePresentList:any = (newPresentsArray:Present[]) => {
        setPresentsList(newPresentsArray);
    }
    const changeKidsList:any = (changedKid:Kid) => {

        const newArray = kidsList.map(kid=>{
            if(changedKid.id === kid.id){
                setChangedKids([...changedKids, kid])
                return changedKid;
            }else{
                return kid
            }
        })
        setKidsList(newArray);
    }

    const saveHandler = async ()=>{
        if(changedKids.length){
            setLoading(true)
            const eo = await Fetch('http://localhost:3001/presents/many',"PUT",presentsList);
            await Fetch('http://localhost:3001/kids/many',"PUT", kidsList);

            setLoading(false)
            setPopUp({title:'Data saved',description:`${changedKids.length} record(s) has been updated!`, color:Color.green})
        }else{
            setPopUp({title:'Everythink is updated 🥳!'})
        }

        setChangedKids([])

    }

    //Render
    const kids =
        kidsList.map(kid=>
            <SingleKid
                key={kid.id}
                kid={kid}
                allToys={presentsList} isChanged={changedKids.filter(changedKid => changedKid.id === kid.id).length ? true : false}
                changePresentList={changePresentList}
                changeKidsList={changeKidsList}
            />)

    return (
        <>
            {popUp && <PopUp title={popUp.title} color={popUp.color} description={popUp.description} turnOffFn={()=>setPopUp(null)}/>}
            <h2>{kids}</h2>
            <button onClick={saveHandler}>Save</button>
        </>
    );
}