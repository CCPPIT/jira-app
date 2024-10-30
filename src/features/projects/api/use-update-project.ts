import { client } from "@/lib/rpc"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {InferResponseType,InferRequestType} from "hono"
import { useRouter } from "next/navigation";
import { toast } from "sonner";
type ResponseType=InferResponseType<typeof client.api.projects[":projectId"]["$patch"],200>;
type RequestType=InferRequestType<typeof client.api.projects[":projectId"]["$patch"]>
export const useUpdateProject=()=>{
    const router=useRouter();
    const queryClien=useQueryClient();
    const mutation=useMutation<ResponseType,Error,RequestType>({
        mutationFn:async({form,param})=>{
            const response=await client.api.projects[":projectId"]["$patch"]({form,param});
            if(!response.ok){
                throw new Error("Failed to update project")

            }
            return await response.json();
        },
        onSuccess:({data})=>{
            toast.success("Project updated");
            router.refresh();
            queryClien.invalidateQueries({queryKey:["projects"]})
            queryClien.invalidateQueries({queryKey:["project",data.$id]})

        },
        onError:()=>{
            toast.error("Failed to update project")
        }
    });
    return mutation


}