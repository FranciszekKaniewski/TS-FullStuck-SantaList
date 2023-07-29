import {useEffect, useState} from "react";
import {Kid, Present} from "types";
import {SingleKid} from "../SingleKid/SingleKid";
import {Fetch} from "../../utils/Fetch";

export const KidsList = () =>{

    //State
    const [kidsList, setKidsList] = useState<null | Kid[]>(null);
    const [presentsList, setPresentsList] = useState<null | Present[]>(null);

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
    if(kidsList === null || presentsList === null){
        return <h1>Loading..</h1>
    }

    //Functions
    const changePresentList:any = (newPresentsArray:Present[]) => {
        setPresentsList(newPresentsArray);
    }
    const changeKidsList:any = (changedKid:Kid) => {

        const newArray = kidsList.map(kid=>{
            if(changedKid.id === kid.id){
                return changedKid;
            }else{
                return kid
            }
        })
        setKidsList(newArray);
    }

    const saveHandler = async ()=>{
        await Fetch('http://localhost:3001/presents/many',"PUT",presentsList);
        await Fetch('http://localhost:3001/kids/many',"PUT", kidsList);
    }

    //Render
    const kids = kidsList.map(kid=><SingleKid key={kid.id} kid={kid} allToys={presentsList} changePresentList={changePresentList} changeKidsList={changeKidsList}/>)

    return (
        <>
            <h2>{kids}</h2>
            <button onClick={saveHandler}>Save</button>
        </>
    );
}