import { createContext, useState } from "react";

export let AuthContext=createContext(0);


export default function AuthContextProvider({children}){

const [token,settoken]=useState(localStorage.getItem('token'));

return <AuthContext.Provider value={{token,settoken}} >

{children}
</AuthContext.Provider>
}
