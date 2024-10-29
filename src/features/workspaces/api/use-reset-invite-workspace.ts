import { client } from "@/lib/rpc"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {InferResponseType,InferRequestType}from "hono"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { json } from "stream/consumers"



type ResponseType=InferResponseType<typeof client.api.workspaces[":workspaceId"]["reset-invite-code"]["$post"], 200>
type RequestType=InferRequestType<typeof client.api.workspaces[":workspaceId"]["reset-invite-code"]["$post"]>
export const useResetInviteCodeWorkspace=()=>{
    const router=useRouter()
    const queryClien=useQueryClient();
    const mutation=useMutation<ResponseType,
    Error,
    RequestType
    >({
        mutationFn:async({param})=>{
            const response=await client.api.workspaces[":workspaceId"]["reset-invite-code"]["$post"]({param})
            if(!response.ok){
                throw new Error("Failed to reset invite code workspace")
            }
            return  await response.json()
        },
        onSuccess:({ data })=>{
            toast.success("Invite code reset Workspace")
            queryClien.invalidateQueries({queryKey:["workspaces"]});
            queryClien.invalidateQueries({queryKey: ["workspace", data.$id]})

            
        },
        onError:()=>{
            toast.error("Failed to reset invite code workspace")
        }
    })
    return mutation

}