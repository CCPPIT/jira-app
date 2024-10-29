"use server"
import {cookies}from "next/headers"
import { Account, Client, Databases, Query } from "node-appwrite"
import { AUTHCOOKIE } from "../auth/constants/cookie"
import { DATABASE_ID, MEMBERS_ID, WORKSPACES_ID } from "@/config"
import { getMember } from "../members/utils"
import { Workspace } from "./types"
import { createSessionClient } from "@/lib/appwrite"
export const getWorkspaces=async()=>{
    try{
        const {account,databases}=await createSessionClient();

    
        // const client=new Client()
        // .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        // .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
        // const session= await cookies().get(AUTHCOOKIE)
        // if(!session) return { documents: [], total: 0};
        // client.setSession(session.value)
        // const account= new Account(client);
        const user = await account.get();

        // const databases= new Databases(client);

      
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
    
};
interface GetWorkspaceProps{
    workspaceId:string
}
export const getWorkspace=async({workspaceId}:GetWorkspaceProps)=>{
    try{
        const {account,databases}= await createSessionClient();

    
        // const client=new Client()
        // .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        // .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
        // const session= await cookies().get(AUTHCOOKIE)
        // if(!session) return null;
        // client.setSession(session.value)
        // const account= new Account(client);
        const user = await account.get();

        // const databases= new Databases(client);

        const member= await getMember({
            databases,
            userId: user.$id,
            workspaceId
        })
        if(!member){
            return null;
        }
        const workspace=await databases.getDocument<Workspace>(
            DATABASE_ID,
            WORKSPACES_ID,
            workspaceId
        )
        return workspace;
        }catch{
            return null;
        }
    
}
interface GetWorkspaceInfoProps{
    workspaceId:string
}
export const getWorkspaceInfo=async({workspaceId}:GetWorkspaceInfoProps)=>{
    try{
        const {account,databases}= await createSessionClient();
        const wordspace=await databases.getDocument<Workspace>(
            DATABASE_ID,
            WORKSPACES_ID,
            workspaceId
        );
        return{
            name:wordspace.name
        }

    }catch{
        return null
    }
}