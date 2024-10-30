"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { createProjectSchema } from "../schemas"
import { z } from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCreateProject } from "../api/use-create-project";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

interface CreateProjectFormProps{
    onCancel?:()=>void
}
export const CreateProjectForm=({onCancel}:CreateProjectFormProps)=>{
    const workspaceId=useWorkspaceId()
    const router=useRouter();
    const inputRef=useRef<HTMLInputElement>(null);
    const {mutate,isPending}=useCreateProject()
    const form=useForm<z.infer<typeof createProjectSchema>>({
        resolver:zodResolver(createProjectSchema.omit({workspaceId:true})),
        defaultValues:{
            name:"",
            
           
        }
    })
    const onSubmit=(values:z.infer<typeof createProjectSchema>)=>{
        const finalValues={
            ...values,
            workspaceId,
            image:values.image instanceof File ? values.image : "",

        }
        mutate({form:finalValues},{
            onSuccess:({data})=>{
                 form.reset();
                   //TODO: Redirect to new workspace
                   router.push(`/workspaces/${workspaceId}/projects/${data.$id}`)
               
                // onCancel?.()
              
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
    return(
        <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="flex p-7">
                <CardTitle className="text-xl font-bold">
                    Create a new project

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
                             alt="" fill className="object-cover"/>
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
                  Create Project

                </Button>

            </div>

            </form>
            </Form>

            </CardContent>

        </Card>

    )

}