import { AUTHCOOKIE } from "@/features/auth/constants/cookie";
import { cookies } from "next/headers";
import {Client,Users,
    Account,
    Storage,
    Databases
}from "node-appwrite"
export async function createSessionClient() {
    const client=new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    const session=await cookies().get(AUTHCOOKIE)
    if(!session || !session.value){
        throw new Error("Unauthorized")

    }
    client.setSession(session.value);
    return{
        get account(){
            return new Account(client)
        },
        get databases(){
            return new Databases(client)
        }
    }
    
}

export async function createAdminClinet() {
    const client=new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!);
    return{
        get account(){
            return new Account(client)
        },
        get users(){
            return new Users(client)
        }
    }
    
}