import { client } from "@/lib/rpc"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {InferResponseType,InferRequestType}from "hono"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { json } from "stream/consumers"



type ResponseType=InferResponseType<typeof client.api.workspaces[":workspaceId"]["join"]["$post"], 200>
type RequestType=InferRequestType<typeof client.api.workspaces[":workspaceId"]["join"]["$post"]>
export const useJoinWorkspace=()=>{
    const router=useRouter()
    const queryClien=useQueryClient();
    const mutation=useMutation<ResponseType,
    Error,
    RequestType
    >({
        mutationFn:async({param,json})=>{
            const response=await client.api.workspaces[":workspaceId"]["join"]["$post"]({param,json})
            if(!response.ok){
                throw new Error("Failed to join workspace")
            }
            return  await response.json()
        },
        onSuccess:({ data })=>{
            toast.success("Joined Workspace")
            queryClien.invalidateQueries({queryKey:["workspaces"]});
            queryClien.invalidateQueries({queryKey: ["workspace", data.$id]})

            
        },
        onError:()=>{
            toast.error("Failed to join workspace")
        }
    })
    return mutation

}