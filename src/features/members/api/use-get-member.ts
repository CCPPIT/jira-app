import { client } from "@/lib/rpc";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {InferResponseType,InferRequestType}from "hono";
import { toast } from "sonner";
interface GetMembersProps{
    workspaceId:string
}

export const useGetMembers=({workspaceId}:GetMembersProps)=>{
    const query=useQuery({
        queryKey:["members",workspaceId],
        queryFn:async()=>{
            const response=await client.api.members.$get({query:{workspaceId}});
            if(!response.ok){
                throw new Error("Failed to fetch members")
            }
            const {data}=await response.json();
            return data

        }
    })
    return query
    
}