import { client } from "@/lib/rpc"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {InferResponseType,InferRequestType} from "hono"
import { toast } from "sonner";
type ResponseType=InferResponseType<typeof client.api.projects[":projectId"]["$delete"],200>;
type RequestType=InferRequestType<typeof client.api.projects[":projectId"]["$delete"]>
export const useDeleteProject=()=>{
    const queryClien=useQueryClient();
    const mutation=useMutation<ResponseType,Error,RequestType>({
        mutationFn:async({param})=>{
            const response=await client.api.projects[":projectId"]["$delete"]({param});
            if(!response.ok){
                throw new Error("Failed to delete project")

            }
            return await response.json();
        },
        onSuccess:({data})=>{
            toast.success("Project deleted");
            queryClien.invalidateQueries({queryKey:["projects"]})
            queryClien.invalidateQueries({queryKey:["project",data.$id]})
        },
        onError:()=>{
            toast.error("Failed to delete project")
        }
    });
    return mutation


}