"use server"
import {cookies}from "next/headers"
import { Account, Client } from "node-appwrite"
import { AUTHCOOKIE } from "./constants/cookie"
import { createSessionClient } from "@/lib/appwrite"
export const getCurrent=async()=>{
    try{

    const {account}= await createSessionClient()
 
    
    return await account.get()
    }catch{
        return null
    }

}