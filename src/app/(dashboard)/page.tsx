// "use client"
import { Button } from "@/components/ui/button";
import { getCurrent } from "@/features/auth/actions";
import { useCurrent } from "@/features/auth/api/use-current";
import { useLogout } from "@/features/auth/api/use-logout";
import UserButton from "@/features/auth/compnonets/user-button";
import { createAdminClinet } from "@/lib/appwrite";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export default async function  Home() {
//  const router=useRouter();
//  const {data,isLoading}=useCurrent();
//  useEffect(()=>{
//   if(!data&&!isLoading){
//     router.push("/sign-in")

//   }
//  },[data])
const user= await getCurrent()
if(!user)redirect("/sign-in")
  return (
    <div>
      <UserButton/>
    </div>
  );
}
