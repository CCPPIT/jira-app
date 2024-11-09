
import {useQueryState,parseAsBoolean, parseAsString}from "nuqs"
export const useEditTaskModal=()=>{
    const [TaskId,setIsEditTaskId]=useQueryState(
        "edit-task",
       parseAsString
    );
    const  open=(id:string)=>setIsEditTaskId(id);
    const close=()=>setIsEditTaskId(null);
    return {
       TaskId,
        open,
        close,
        setIsEditTaskId
    }
}