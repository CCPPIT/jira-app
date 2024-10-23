import { Hono } from "hono";
import {zValidator}from "@hono/zod-validator"
import { loginSchema, registerSchema } from "../schemas";
import { createAdminClinet } from "@/lib/appwrite";
import { ID } from "node-appwrite";
import {deleteCookie, setCookie}from "hono/cookie"
import { AUTHCOOKIE } from "../constants/cookie";
import { sessionMiddleware } from "@/lib/session-middleware";
const app =new Hono()
.get("/current",sessionMiddleware,(c)=>{
    const user=c.get("user");
    return c.json({data:user})
})
.post("/login",
    zValidator("json", loginSchema),
    async (c)=>{
        const {email,password}=c.req.valid("json")
        const {account}=await createAdminClinet();
        const session=await account.createEmailPasswordSession(
            email,
            password
        );
        setCookie(c,AUTHCOOKIE,session.secret,{
            path:"/",
            httpOnly:true,
            secure:true,
            sameSite:"strict",
            maxAge: 60 * 60 * 24 * 30,

        })

    return c.json({success:true})
})
.post("/register",
    zValidator("json",registerSchema),
   async (c)=>{
        const {name,email,password}=c.req.valid("json");
        const {account}= await createAdminClinet()
        const user=await account.create(
            ID.unique(),
            email,
            password,
            name
        )
        const session=await account.createEmailPasswordSession(
            email,
            password
        );
        setCookie(c,AUTHCOOKIE,session.secret,{
            path:"/",
            httpOnly:true,
            secure:true,
            sameSite:"strict",
            maxAge:60 * 60 * 24 * 30,

        })
        return c.json({success:true})
    }

)
.post("/logout", sessionMiddleware,
    async(c)=>{
    const account=c.get("account");
    deleteCookie(c,AUTHCOOKIE);
    await account.deleteSession("current")
    
    return c.json({success:true})
})
export default app