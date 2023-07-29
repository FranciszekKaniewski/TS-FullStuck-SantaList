export const Fetch = async (URL:string,Method:string,body:any) =>{
    await fetch(URL, {
        method: Method,
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });
}