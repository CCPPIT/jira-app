import { zValidator } from "@hono/zod-validator"
import {Hono}from "hono"
import { createWorkspaceSchema, updateWorkspaceSchema } from "../schemas"
import { sessionMiddleware } from "@/lib/session-middleware"
import { DATABASE_ID, IMAGES_BUCKET_ID, MEMBERS_ID, WORKSPACES_ID } from "@/config"
import { ID, Query } from "node-appwrite"
import { MemeberRole } from "@/features/members/types"
import { generateInviteCode } from "@/lib/utils"
import { getMember } from "@/features/members/utils"
import { z } from "zod"
import { Workspace } from "../types"
import { error } from "console"
const app =new Hono()
.get("/",sessionMiddleware,async(c)=>{
    const databases=c.get("databases");
    const user=c.get("user")
    const members=await databases.listDocuments(
        DATABASE_ID,
        MEMBERS_ID,
        [Query.equal("userId",user.$id)]
    );
    if(members.total === 0){
        return c.json({data:{documents: [],total:0}})
    }
    const workspaceIds=members.documents.map((member)=>member.workspaceId)
    const workspaces=await databases.listDocuments(
        DATABASE_ID,
        WORKSPACES_ID,
        [
            Query.orderDesc("$createdAt"),
            Query.contains("$id",workspaceIds)
        ],
    );
    return c.json({data:workspaces})
}).get("/:workspaceId",sessionMiddleware,
    async(c)=>{
        const user=c.get("user");
        const databases=c.get("databases");
        const {workspaceId}=c.req.param();
        const member=await getMember({
            databases,
            workspaceId,
            userId:user.$id
        })
        if(!member){
            return c.json({error:"Unauthorized"},401)
        }
        const workspace=await databases.getDocument<Workspace>(
            DATABASE_ID,
            WORKSPACES_ID,
            workspaceId
        )
        return c.json({data:workspace})
    }
)
.post("/",
    zValidator("form",createWorkspaceSchema),
    sessionMiddleware,
    async(c)=>{
        const storage=c.get("storage")

       const databases=c.get("databases")
       const user=c.get("user");
       const {name,image}=c.req.valid("form");
       // Upload image
       let uploadedImageUrl:string|undefined;
       if( image instanceof File){
        const file=await storage.createFile(
            IMAGES_BUCKET_ID,
            ID.unique(),
            image
        )

        const arrayBuffer=await storage.getFilePreview(
            IMAGES_BUCKET_ID,
            file.$id
        )
        uploadedImageUrl=`data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`
       }

       const workspace=await databases.createDocument(
        DATABASE_ID,
        WORKSPACES_ID,
       
        ID.unique(),
        {
            name,
            userId:user.$id,
            imageUrl:uploadedImageUrl,
            inviteCode:generateInviteCode(10)
        }
       );
       // Create Members
       await databases.createDocument(
        DATABASE_ID,
        MEMBERS_ID,
        ID.unique(),
        {
            userId:user.$id,
            workspaceId:workspace.$id,
            role:MemeberRole.ADMIN
        }

       )
       return c.json({data:workspace})
    }
)
.patch(
    "/:workspaceId",
    sessionMiddleware,
    zValidator("form",updateWorkspaceSchema),
    async(c)=>{
        const databases=c.get("databases");
        const storage=c.get("storage");
        const user=c.get("user");
        const {workspaceId}=c.req.param();
        const {name,image}=c.req.valid("form")
        const member= await getMember({
            databases,
            workspaceId,
            userId: user.$id
        })
        if(!member|| member.role !== MemeberRole.ADMIN){
            return c.json({error:"Unauthorized"},401);
        }
        // Upload image
        let uploadedImageUrl:string|undefined;
        if( image instanceof File){
         const file=await storage.createFile(
             IMAGES_BUCKET_ID,
             ID.unique(),
             image
         )
 
         const arrayBuffer=await storage.getFilePreview(
             IMAGES_BUCKET_ID,
             file.$id
         )
         uploadedImageUrl=`data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`
        }else{
            uploadedImageUrl=image
        }
        const workspace=await databases.updateDocument(  
            DATABASE_ID,
            WORKSPACES_ID,
            workspaceId,
            {
                name,
                imageUrl: uploadedImageUrl,

            }

        );
        return c.json({data:workspace})

    }


)
.delete(
    "/:workspaceId",
    sessionMiddleware,
    async (c)=>{
        const user= c.get("user");
        const databases=c.get("databases");
        const {workspaceId}= c.req.param();
        const member=await getMember({
            databases,
            workspaceId,
            userId: user.$id
        })
        if(!member || member.role !== MemeberRole.ADMIN){
            return c.json({error:"Unauthroized"},401)
        }
        //TODO:DELETE MEMBERS, PROJECTS, AND TASKs
       await databases.deleteDocument(
            DATABASE_ID,
            WORKSPACES_ID,
            workspaceId
        )
        return c.json({data:{$id:workspaceId}})

    }
)
.post(
    "/:workspaceId/reset-invite-code",
    sessionMiddleware,
    async (c)=>{
        const user= c.get("user");
        const databases=c.get("databases");
        const {workspaceId}= c.req.param();
        const member=await getMember({
            databases,
            workspaceId,
            userId: user.$id
        })
        if(!member || member.role !== MemeberRole.ADMIN){
            return c.json({error:"Unauthroized"},401)
        }
        //TODO:DELETE MEMBERS, PROJECTS, AND TASKs
    const workspace=   await databases.updateDocument(
            DATABASE_ID,
            WORKSPACES_ID,
            workspaceId,
            {
                inviteCode:generateInviteCode(10)
            }
        )
        return c.json({data:workspace})

    }
).post(
    "/:workspaceId/join",
    sessionMiddleware,
    zValidator("json",z.object({code:z.string()})),
    async(c)=>{
        const {code}=c.req.valid("json");
        const {workspaceId}=c.req.param();
        const databases=c.get("databases");
        const user=c.get("user");
        const member=await getMember({
            databases,
            workspaceId,
            userId:user.$id
        });
        if(member){
            return c.json({error:"Already a member"},400)
        }
        const wordspace=await databases.getDocument<Workspace>(
            DATABASE_ID,
            WORKSPACES_ID,
            workspaceId
        );
        if(wordspace.inviteCode !==code){
            return c.json({error:"Invalid invite code"},400)
        }
        await databases.createDocument(
            DATABASE_ID,
            MEMBERS_ID,
            ID.unique(),
            {
                workspaceId,
                userId:user.$id,
                role:MemeberRole.MEMBER
            }

        );
        return c.json({data:wordspace})

    }

)
export default app