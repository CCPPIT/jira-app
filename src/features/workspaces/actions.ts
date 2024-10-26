"use server"
import {cookies}from "next/headers"
import { Account, Client, Databases, Query } from "node-appwrite"
import { AUTHCOOKIE } from "../auth/constants/cookie"
import { DATABASE_ID, MEMBERS_ID, WORKSPACES_ID } from "@/config"
export const getWorkspaces=async()=>{
    try{

    
        const client=new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
        const session= await cookies().get(AUTHCOOKIE)
        if(!session) return { documents: [], total: 0};
        client.setSession(session.value)
        const account= new Account(client);
        const user = await account.get();

        const databases= new Databases(client);

      
        const members= await databases.listDocuments(
            DATABASE_ID,
            MEMBERS_ID,
            [Query.equal("userId", user.$id)],

        );
        if(members.total === 0){
            return { documents: [], total: 0 } ;

        }
        const workspaceIds=members.documents.map((member)=>member.workspaceId);
        const wordspaces=await databases.listDocuments(
            DATABASE_ID,
            WORKSPACES_ID,
            [
                Query.orderDesc("$createdAt"),
                Query.contains("$id",workspaceIds)
            ]

        )
        return wordspaces;
        }catch{
            return{ documents: [], total: 0 } ;
        }
    
}