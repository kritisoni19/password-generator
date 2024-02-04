import { useCallback, useEffect, useState,useRef } from "react";

function PassGenerator(){

    // set length

    const[length,setLength] = useState(14);
    const [numAllow, setNumAllow] = useState(false);
    const [charAllow, setCharAllow] = useState(false);
    const [passwordInput, setPassword] = useState();

    // password generator func = this fun need to call 3-4 times so use useCallback hook

    const passGeneratorFunc =  useCallback(()=>{
        let pass = '';
        let str ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        if(numAllow ){
            str+= '0123456789';
        }
        if(charAllow){
            str+= '@#$';
        }
        for(let i=1;i<=length;i++){
            let char =  Math.floor(Math.random()* str.length +1);
            pass+= str.charAt(char);
        }
        setPassword(pass)
    },[length,numAllow,charAllow,setPassword])

    const passRef = useRef(null);

    const copyToClipboard = ()=>{
        passRef.current?.select();
        // range
        passRef.current?.setSelectionRange(0,15)
        window.navigator.clipboard.writeText(passwordInput)
    }

    useEffect(()=>{
        passGeneratorFunc();
    },[passGeneratorFunc,length,numAllow,charAllow])
    
    return <>
    <h1 className="text-3xl font-bold underline text-center mt-3 mb-5 text-white">PASSWORD GENERATOR </h1>

    <div className=" p-5 bg-slate-400 mx-[auto] relative w-[40rem] rounded-md">
        <input type="text" 
        value={passwordInput}
        readOnly
        ref={passRef}
        className="w-full bg-gray-50 border
         border-gray-300 text-gray-900 text-sm rounded-lg
          focus:ring-blue-500 focus:border-blue-500 block  
           p-2.5  dark:bg-gray-700 dark:border-gray-600
           dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
            dark:focus:border-blue-500 font-bold"/>
       
        <button type="button" 
        onClick={copyToClipboard}
        className="absolute right-[12px] top-[21px] text-white bg-gradient-to-r
         from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focu
         s:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800
          font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2" >Copy </button>

          <div className="mt-3">
                <input type="range"  min='0' max='20' value={length} onChange={(e)=>{setLength(e.target.value)}}/>
                
                <span className="ml-2">Length {length}</span>

                <input type="checkbox"
                 className="ml-2"
                 value={numAllow}
                 onChange={()=>{setNumAllow((prev)=>!prev)}}
                 /> Numbers

                <input type="checkbox"
                 className="ml-2"
                 value={charAllow}
                 onChange={()=>{setCharAllow((prev)=> !prev)}}
                 /> Characters
          </div>
    </div>
    </>
}

export default PassGenerator;