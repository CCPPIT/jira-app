import { client } from "@/lib/rpc"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {InferResponseType,InferRequestType} from "hono"
import { toast } from "sonner";
type ResponseType=InferResponseType<typeof client.api.projects["$post"],200>;
type RequestType=InferRequestType<typeof client.api.projects["$post"]>
export const useCreateProject=()=>{
    const queryClien=useQueryClient();
    const mutation=useMutation<ResponseType,Error,RequestType>({
        mutationFn:async({form})=>{
            const response=await client.api.projects["$post"]({form});
            if(!response.ok){
                throw new Error("Failed to create project")

            }
            return await response.json();
        },
        onSuccess:()=>{
            toast.success("Project created");
            queryClien.invalidateQueries({queryKey:["projects"]})
        },
        onError:()=>{
            toast.error("Failed to create project")
        }
    });
    return mutation


}