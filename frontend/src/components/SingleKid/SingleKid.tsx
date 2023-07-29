import {Kid, Present} from 'types'

interface Props {
    kid:Kid;
    allToys:Present[]|[];
    changePresentList:(newPresentsArray:Present[])=>{};
    changeKidsList:(changedKid:Kid)=>{};
}

export const SingleKid = ({kid,allToys,changePresentList,changeKidsList}:Props) =>{

    //Functions
    const changeHandler = async (e:any) =>{

        const newPresentsArray = allToys.map(toy=>{
            if(toy.id===e.target.value){
                return {...toy,value:toy.value - 1}
            }else if(toy.id===kid.toyId){
                return {...toy,value:toy.value + 1}
            }else{
                return toy
            }
        })

        changePresentList(newPresentsArray)
        changeKidsList({...kid,toyId:e.target.value});
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

    return(
    <>
    <p><b>({kid.id})</b> {kid.name} | {select}</p>
    </>
    );
}

//@TODO uninstal Sellect