export const Fetch = async (URL:string,Method:string,body:any) =>{
    const f = await fetch(URL, {
        method: Method,
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });
    console.log(f)
    if(f.status !== 200){
        return ((await f.json()).message)
    }else{
        console.log('ok')
        return null
    }
}