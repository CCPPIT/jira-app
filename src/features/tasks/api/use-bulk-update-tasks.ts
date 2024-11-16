import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {InferResponseType,InferRequestType}from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
type ResponseType=InferResponseType<typeof client.api.tasks["bulk-update"]["$post"],200>
type RequestType=InferRequestType<typeof client.api.tasks["bulk-update"]["$post"]>
export const useBulkUpdateTasks=()=>{
    const router=useRouter();
    const queryClien=useQueryClient();
    const mutation=useMutation<ResponseType,Error,RequestType>({
        mutationFn:async({json})=>{
            const response=await client.api.tasks["bulk-update"]["$post"]({json})
            if(!response.ok){
                throw new Error("Failed to update tasks")
            }
            return await response.json();
        },
        onSuccess:()=>{
            toast.success("Tasks updated");
            router.refresh();
            queryClien.invalidateQueries({queryKey:["tasks"]});
        },
        onError:()=>{
            toast.error("Failed to update tasks")
        }
        
    }
        
    )
    return mutation;

}