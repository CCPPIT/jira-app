import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {InferResponseType,InferRequestType}from "hono";
import { toast } from "sonner";
type ResponseType=InferResponseType<typeof client.api.members[":memberId"]["$patch"],200>
type RequestType=InferRequestType<typeof client.api.members[":memberId"]["$patch"]>
export const useUpdateMembers=()=>{
    const queryClien=useQueryClient();
    const mutation=useMutation<ResponseType,
    Error,
    RequestType
    >({
        mutationFn:async({param,json})=>{
            const response=await client.api.members[":memberId"]["$patch"]({param,json});
            if(!response.ok){
                throw new Error("Failed to update member")
            }
            return await response.json();

        },
        onSuccess:()=>{
            toast.success("Member updated");
            queryClien.invalidateQueries({queryKey:["members"]})
            // queryClien.invalidateQueries({queryKey:["member",data.$id]})

        },
        onError:()=>{
            toast.error("Failed to update member")
        }
    }
    

    )
    return mutation
}