import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {InferResponseType,InferRequestType}from "hono";
import { toast } from "sonner";
type ResponseType=InferResponseType<typeof client.api.members[":memberId"]["$delete"],200>
type RequestType=InferRequestType<typeof client.api.members[":memberId"]["$delete"]>
export const useDeleteMembers=()=>{
    const queryClien=useQueryClient();
    const mutation=useMutation<ResponseType,
    Error,
    RequestType
    >({
        mutationFn:async({param})=>{
            const response=await client.api.members[":memberId"]["$delete"]({param});
            if(!response.ok){
                throw new Error("Failed to delete member")
            }
            return await response.json();

        },
        onSuccess:()=>{
            toast.success("Member deleted");
            queryClien.invalidateQueries({queryKey:["members"]})
            // queryClien.invalidateQueries({queryKey:["member",data.$id]})

        },
        onError:()=>{
            toast.error("Failed to delete member")
        }
    }
    

    )
    return mutation
}