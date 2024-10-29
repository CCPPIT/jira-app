//"use client"
import { Button } from "@/components/ui/button";
import { getCurrent } from "@/features/auth/queries";
import { useLogout } from "@/features/auth/api/use-logout";
import { getWorkspaces } from "@/features/workspaces/queries";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function  Home() {

const user= await getCurrent()
if(!user)redirect("/sign-in");
  const workspaces= await getWorkspaces();
if(workspaces.total === 0) {
  redirect("/workspaces/create")

}else{
  redirect(`/workspaces/${workspaces.documents[0].$id}`)
}
  
}
