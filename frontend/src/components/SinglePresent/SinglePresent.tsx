import React, {useRef, useState} from "react";
import { Present } from "types";

interface Props {
    id:string
    name:string;
    value:number;
    changePresentsList:(editedPresent:Present,isChanged:boolean)=>void;
}

export const SinglePresent = ({id,name,value,changePresentsList}:Props) =>{
    //State
    const [nameInput,setNameInput] = useState(name)
    const [valueInput,setValueInput] = useState(value)

    const refName = useRef<string>(name)
    const refNumber = useRef<number>(value)

    const [isChanged,setIsChanged] = useState(false);

    //Functions

    const changedHandler = (name:string,value:number) =>{
        setIsChanged(name !== refName.current || value !== refNumber.current)
    }

    const nameInputHandler = (e: React.ChangeEvent<HTMLInputElement>) =>{

        setNameInput(e.target.value)
        const isChanged = e.target.value !== refName.current
        changedHandler(e.target.value,valueInput);

        changePresentsList({id:id,name:e.target.value,value:value},isChanged)
    }
    const valueInputHandler = (e: React.ChangeEvent<HTMLInputElement>) =>{

        const newValue = parseInt(e.target.value) || 0
        setValueInput(newValue)
        const isChanged = newValue !== refNumber.current
        changedHandler(nameInput,newValue);

        changePresentsList({id:id,name:name,value:newValue},isChanged)
    }


    //Render
    const style = isChanged ? {backgroundColor: '#f5f5ae'}: {backgroundColor: '#ffffff'}

    return(
        <li style={style}>
            <span>({id}) </span>
            <input type="text" placeholder={refName.current} value={nameInput} onChange={nameInputHandler}/>
            <input type="number" placeholder={String(refNumber.current)} min="0" value={valueInput} onChange={valueInputHandler}/>
        </li>
    )
}