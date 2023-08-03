import './pop-up.css'
import {PopUpProps} from "../../../utils/frontent-types/types";
import {useEffect, useRef} from "react";

export const PopUp = ({title,description="",color,turnOffFn}:PopUpProps) => {

    const popUpRef = useRef<HTMLDivElement|null>(null)

    useEffect(()=>{
        const timeout = setTimeout(()=>{
            closeHandler();
        },4000)

        return ()=>{clearTimeout(timeout)};
    })

    const closeHandler = () =>{
        if(popUpRef.current){
            popUpRef.current.style.animation = 'popUpClose .7s reverse'
        }
        setTimeout(()=>{
            turnOffFn()
        },660)
    }

    const style = {backgroundColor: color}

    return (
        <div ref={popUpRef} className="pop-up" style={style} onClick={closeHandler}>
            <h1>{title}</h1>
            {description && <p>{description}</p>}
        </div>
    )
}