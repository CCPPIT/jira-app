"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { createProjectSchema, updateProjectSchema } from "../schemas"
import { z } from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeftIcon, CopyIcon, ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCreateProject } from "../api/use-create-project";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { Project } from "../types";
import { useUpdateProject } from "../api/use-update-project";
import { useProjectId } from "../hooks/use-project-id";
import { useDeleteProject } from "../api/use-delete-project";
import { useConfirm } from "@/hooks/use-confirm";

interface UpdateProjectFormProps{
    onCancel?:()=>void
    initialValues:Project
}
export const UpdateProjectForm=({onCancel,initialValues}:UpdateProjectFormProps)=>{
    const [ConfirmDialog,confirm]=useConfirm(
        "Delete Project",
        "This action cannot be undone",
        "destructive"
    )
    const projectId=useProjectId();
    const router=useRouter();
    const inputRef=useRef<HTMLInputElement>(null);
    const {mutate,isPending}=useUpdateProject()
    const {mutate:deleteProject,isPending:isDeletingProject}=useDeleteProject();
    const form=useForm<z.infer<typeof updateProjectSchema>>({
        resolver:zodResolver(updateProjectSchema),
        defaultValues:{
           
            ...initialValues,
            image:initialValues.imageUrl??""
            
           
        }
    })
    const onSubmit=(values:z.infer<typeof updateProjectSchema>)=>{
        const finalValues={
            ...values,
           
            image: values.image instanceof File ? values.image : "",

        }
        mutate({form:finalValues,param:{projectId:initialValues.$id}},{
            onSuccess:()=>{
                form.reset();
                
              
            }
        }
            
        )

    }
    const handleChangeImage=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const file=e.target.files?.[0];
        if(file){
            form.setValue("image",file)
        }

    }
    const handleDeleteProject=async()=>{
        const ok=await confirm();
        if(!ok) return;
        deleteProject({
            param:{projectId:initialValues.$id}
        },{
            onSuccess:({data})=>{
                window.location.href=`/workspaces/${initialValues.workspaceId}`
            }
        })
       

    }
    return(
        <div className="flex flex-col gap-y-4">
            <ConfirmDialog/>
           
            
             <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="flex flex-row items-center gap-x-4 space-y-0 p-7">
                <Button size={"sm"} variant={"secondary"} onClick={onCancel?onCancel:()=>router.push(`/workspaces/${initialValues.workspaceId}/projects/${initialValues.$id}`)}>
                    <ArrowLeftIcon className="size-4 mr-2"/>
                    Back

                </Button>
                <CardTitle className="text-xl font-bold">
                    {initialValues.name}

                </CardTitle>

            </CardHeader>
            <div className="px-7">
            <Separator className="border-dotted border-2 border-neutral-500"/>
            </div>
            <CardContent className="p-7">
            <Form {...form}>
               
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 p-2'>
        
            <div className="flex flex-col gap-y-4">
            <FormField 
            control={form.control}
            name="name"
            
            render={({field})=>(
             <FormItem>
                <FormLabel>Project Name</FormLabel>
             <FormControl>

                
            <Input
           
        
            placeholder='Enter project name'
            {...field}
            />
            
             </FormControl>
             <FormMessage/>
                </FormItem>

            )}
            />
              <FormField 
            control={form.control}
            name="image"
            
            render={({field})=>(
                <div className="flex flex-col gap-y-2">
                    <div className="flex items-center gap-x-5">
                        {field.value?(
                            <div className="size-[72px] relative rounded-md overflow-hidden">
                            <Image

                            src={field.value instanceof File
                                ? URL.createObjectURL(field.value)
                                : field.value
                            }
                             alt="logo" fill className="object-cover"/>
                              </div>
                             
                             
                        ):(
                        <Avatar className="size-[75px]">
                            <AvatarFallback>
                                <ImageIcon className="size-[36px] text-neutral-400"/>

                            </AvatarFallback>
                        </Avatar>
                       

                        )}
                        <div className="flex flex-col">
                            <p className="text-sm">Project Icon</p>
                            <p className="text-sm text-muted-foreground">JPG, PNG, SVG,  or JPEG, max 1MB</p>

                             <input
                             type="file"
                             className="hidden"
                             accept=".jpg, .png,.jpeg, .svg"
                             ref={inputRef}
                             onChange={handleChangeImage}
                             />
                              {field.value?(
                                 <Button
                                 type="button"
                                 disabled={isPending}
                                 variant={"destructive"}
                                 size={"xs"}
                                 className="w-fit mt-2"
                                 onClick={()=>{
                                    field.onChange(null);
                                    if(inputRef.current){
                                        inputRef.current.value="";
                                    }
                                 }}
                                 >
                                   Remove Image
    
                                 </Button>

                             ):(
                                <Button
                                type="button"
                                disabled={isPending}
                                variant={"teritary"}
                                size={"xs"}
                                className="w-fit mt-2"
                                onClick={()=>inputRef.current?.click()}
                                >
                                   Upload Image
   
                                </Button>
                             )}
                            
                        </div>

                    </div>

                </div>
          
            
            

            )}
            />
            
            
            </div>
            <Separator className="border-dotted border-2 border-neutral-500"/>
            <div className="flex items-center justify-between">
                <Button type="button" 
                variant={"secondary"}
                size={"lg"}
                onClick={onCancel}
                disabled={isPending}
                className={cn(!onCancel&&"invisible")}
                >
                    Cancel

                </Button>
                <Button type="submit" 
                variant={"default"}
                disabled={isPending}
                size={"lg"}
                
                >
                  Save Changes

                </Button>

            </div>

            </form>
            </Form>

            </CardContent>

        </Card>

        <Card className="w-full h-full border-none shadow-none">
            <CardContent className="py-7">
                <div className="flex flex-col">
                    <h3 className="font-bold">Danger Zone</h3>
                    <p className="text-sm text-muted-foreground">Delete a project is irreversible and will remove all associated data</p>
                     <Button
                     variant={"destructive"}
                     size={"sm"}
                     className="mt-6 w-fit ml-auto"
                     type="button"
                     disabled={isDeletingProject}
                     onClick={handleDeleteProject}
                     >
                        Delete Project
                     </Button>
                </div>

            </CardContent>

        </Card>

        </div>
       

    )

}