'use server'
import { put } from "@vercel/blob";

const record = (filename, obj) => {
    console.log(obj);
    (async ()=>{
        const { url } = await put(filename+".json", obj, { access: 'public' });
    })()
}

export default record