import {useEffect, useState} from "react";
import {Present} from "types";
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
    },[loading])

    //Loading
    if(presentsList === null || loading){
        return <h1>Loading...</h1>
    }

    //Functions
    const saveHandler = async () =>{

        if(changedPresentRecords.length){
            setLoading(true);
            const res = await Fetch('http://localhost:3001/presents/many',"PUT",presentsList)
            await setPresentsList([])
            setLoading(false)

            if(res!==null){
                setPopUp({title: 'Error', description: `${res}`, color: Color.red})
            }else{
                setPopUp({title:'Data saved',description:`${changedPresentRecords.length} record(s) has been updated!`, color:Color.green})
            }
            setChangedPresentRecords([])

        }else{
            !popUp && setPopUp({title:'Everythink is updated 🥳!'})
        }
    }

    const deleteHandler = async (present:Present)=>{
        setLoading(true)
        const res = await Fetch('http://localhost:3001/presents','DELETE', present)
        setLoading(false)
        if(res===null){
            setPopUp({title:"Record Deleted!", description:`record: ${present.name}`,color:Color.green})
        }else{
            setPopUp({title:"Error!", description:`record: ${res}`,color:Color.red})
        }

    }

    const changePresentsList = (editedPresent:Present,isChanged:boolean) =>{
        console.log(changedPresentRecords)

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
            deleteHandler={deleteHandler}
            changePresentsList={changePresentsList}
        />)

    return(
        <>
            {popUp && <PopUp title={popUp.title} color={popUp.color} description={popUp.description} turnOffFn={()=>setPopUp(null)}/>}
            <h1>Presents List</h1>
            <ul className='present-list'>{presents}</ul>
            <button onClick={saveHandler}>Save</button>
        </>
    )
}