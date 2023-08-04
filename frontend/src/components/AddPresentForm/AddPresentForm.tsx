import {Fetch} from "../../utils/Fetch";
import {useRef, useState} from "react";
import {Present} from "types";
import {PopUp} from "../common/PopUp/PopUp";
import {Color, PopUpDeps} from "../../utils/frontent-types/types";

export const AddPresentForm = () => {

    const [nameInput,setNameInput] = useState<string>('')
    const [valueInput,setValueInput] = useState<number>(0)
    const [popUp,setPopUp] = useState<null|PopUpDeps>(null);

    const inputText = useRef<HTMLInputElement|null>(null)
    const inputNumber = useRef<HTMLInputElement|null>(null)

    const submitHandler = async (e:any) =>{
        e.preventDefault()

        const present:Present = {name:nameInput,value:valueInput}

        if(!(present.name === '' && present.value === 0)) {
            const res = await Fetch('http://localhost:3001/presents', 'POST', present)
            if (res === null) {
                setPopUp({
                    title: `New present added!`,
                    description: `present: ${nameInput} | ${valueInput}`,
                    color: Color.green
                })
            } else {
                setPopUp({title: `Error!`, description: `${res}`, color: Color.red})
            }
        }else{
            setPopUp({title: `No data entered`, description: `add present name and value to add present to the storage`})
        }

        setNameInput('')
        if(inputText.current!==null) inputText.current.value = '';
        setValueInput(0)
        if(inputNumber.current!==null) inputNumber.current.value = '0';
    }

    const nameHandler = (e:any) =>{
        setNameInput(e.target.value)
    }
    const valueHandler = (e:any) =>{
        setValueInput(e.target.value)
    }

    return(
        <>
            {popUp && <PopUp turnOffFn={()=>setPopUp(null)} title={popUp.title} description={popUp.description} color={popUp.color}/>}
            <h1>Add Present</h1>
            <form onSubmit={submitHandler}>
                <h2>Add new present</h2>
                <span>name: </span><input ref={inputText} onChange={nameHandler} type="text"/> <br/>
                <span>value: </span><input ref={inputNumber} onChange={valueHandler} type="number" defaultValue={0}/>
                <button>Add</button>
            </form>
        </>
    )
}