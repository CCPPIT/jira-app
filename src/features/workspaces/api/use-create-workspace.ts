import { client } from "@/lib/rpc"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {InferResponseType,InferRequestType}from "hono"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { json } from "stream/consumers"



type ResponseType=InferResponseType<typeof client.api.workspaces["$post"]>
type RequestType=InferRequestType<typeof client.api.workspaces["$post"]>
export const useCreateWorkspace=()=>{
    const router=useRouter()
    const queryClien=useQueryClient();
    const mutation=useMutation<ResponseType,
    Error,
    RequestType
    >({
        mutationFn:async({form})=>{
            const response=await client.api.workspaces["$post"]({form})
            if(!response.ok){
                throw new Error("Failed to create workspace")
            }
            return response.json()
        },
        onSuccess:()=>{
            toast.success("Workspaces created")
            queryClien.invalidateQueries({queryKey:["workspaces"]})
            
        },
        onError:()=>{
            toast.error("Failed to create workspace")
        }
    })
    return mutation

}