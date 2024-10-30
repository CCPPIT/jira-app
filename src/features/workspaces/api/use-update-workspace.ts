import { client } from "@/lib/rpc"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {InferResponseType,InferRequestType}from "hono"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { json } from "stream/consumers"



type ResponseType=InferResponseType<typeof client.api.workspaces[":workspaceId"]["$patch"], 200>
type RequestType=InferRequestType<typeof client.api.workspaces[":workspaceId"]["$patch"]>
export const useUpdateWorkspace=()=>{
    const router=useRouter()
    const queryClien=useQueryClient();
    const mutation=useMutation<ResponseType,
    Error,
    RequestType
    >({
        mutationFn:async({form, param})=>{
            const response = await client.api.workspaces[":workspaceId"]["$patch"]({form, param})
            if(!response.ok){
                throw new Error("Failed to update workspace")
            }
            return await response.json()
        },
        onSuccess:({data})=>{
            toast.success("Workspaces updated")
            // router.refresh();
            queryClien.invalidateQueries({queryKey: ["workspaces"] })
            queryClien.invalidateQueries({queryKey:["workspace", data.$id]})

            
        },
        onError:()=>{
            toast.error("Failed to updated workspace")
        }
    })
    return mutation

}