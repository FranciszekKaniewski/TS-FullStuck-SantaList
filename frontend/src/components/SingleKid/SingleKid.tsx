import {Kid, Present} from 'types'
import {useRef, useState} from "react";

interface Props {
    kid:Kid;
    allToys:Present[]|[];
    changeKidsList:(editedKid:Kid,isChanged:boolean)=>void;
    changePresentsValues:(editedPresent:Present,prevPresentId:string|undefined)=>{};
}

export const SingleKid = ({kid,allToys, changePresentsValues,changeKidsList}:Props) =>{

    //Data
    const [isChanged,setIsChanged] = useState(false)
    const [currPresent,setCurrPresent] = useState<Present>(allToys.filter(toy=>toy.id===kid.toyId)[0])

    const prevToyId = useRef(kid.toyId);

    //Functions
    const changeHandler = async (e:any) =>{

        setCurrPresent(allToys.filter(toy=>toy.id===e.target.value)[0])

        setIsChanged(prevToyId.current !== e.target.value);


        changePresentsValues(allToys.filter(toy=>toy.id === e.target.value)[0],currPresent.id);
        changeKidsList({...kid,toyId:e.target.value}, prevToyId.current !== e.target.value);
    }

    //Render
    const toy = allToys.filter(e => e.id === kid.toyId)[0]
    const select =
        <select onChange={changeHandler}>
            {allToys.length ?
                <option value={kid.toyId}>{toy.name} ({toy.value})</option> :
                <option>NULL</option>
            }
            {allToys.length ?
                allToys.filter(e=>e.id!==kid.toyId).map(toy=> <option disabled={toy.value?false:true} key={toy.id} value={toy.id}>{toy.name} ({toy.value})</option>) :
                allToys.map(e=> <option key={e.id} value={e.id}>{e.name} ({e.value})</option>)
            }
        </select>

    const style = isChanged ? {backgroundColor: '#f5f5ae'}: {backgroundColor: '#ffffff'}

    return(
    <>
    <li style={style}><span className='id'>({kid.id})</span> <b className="name">{kid.name}</b> | {select}</li>
    </>
    );
}