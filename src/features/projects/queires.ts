import { createSessionClient } from "@/lib/appwrite"
import { getMember } from "../members/utils";
import { DATABASE_ID, PROJECT_ID } from "@/config";
import { Project } from "./types";

interface GetProjectProps{
    projectId:string
}
export const getProject=async({projectId}:GetProjectProps)=>{
    
        const {account,databases}=await createSessionClient();
        const user=await account.get();
        const project=await databases.getDocument<Project>(
            DATABASE_ID,
            PROJECT_ID,
            projectId
            
            
        )
        const member=await getMember({
            databases,
            workspaceId:project.workspaceId,
            userId:user.$id
        });
        if(!member){
            throw new Error("Unauthorized");
        }
        return project

  

}