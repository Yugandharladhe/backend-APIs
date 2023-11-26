const Task=require("../models/Task")
const User=require("../models/User")

const createTask=async(req,res)=>{

    const{taskName,assignedTo}=req.body
    const{_id}=req.userDetails

    try{
        const newTask=await Task.create({taskName,assignedTo,createdBy:_id});
        if(newTask)
        {
            res.status(201).json({message:"Task created and assigned to user",task:newTask})
        }        
    }catch(err)
    {
        res.status(400).json({msg:"something went wrong",err})
    }
}

const updateTask=async(req,res)=>{

    const{id}=req.query
    const{_id}=req.userDetails
    const{isCompleted}=req.body

    try{
        const check=await Task.findOne({_id:id})
        if(!check)
        {
            res.status(404).json({message:"task not found"})
        }
        if(check?.createdBy===_id || check?.assignedTo===_id)
        {
            const updateTask=await Task.findByIdAndUpdate(taskId,{isCompleted},{new:true});
            if(updateTask)
            {
                res.status(201).json({task:newTask,message:"Task created and assigned to user"});
            }
            else
            {
                res.status(201).json({message:"Task updation failed or unauthorized to delete"});
            }   
        }
        else{
            res.status(404).json({message:"unauthorized to update the task"});
        }  
    }catch(error)
    {
        res.status(401).json({msg:"something went wrong",err:error.message})
    }
}

const getSingleTask=async(req,res)=>{

    const{id}=req.query

    try{

        const singleTask=await Task.findById(id);
        if(singleTask)
        {
            res.status(201).json({task:newTask,message:"Task created and assigned to user"});
        }
        else
        {
            res.status(404).json({message:"Task not found"});
        }    
    }catch(err)
    {
        res.status(400).json({msg:"something went wrong",err})
    }
}

const getAllTask=async(req,res)=>{

    const{_id}=req.userDetails

    try{
        const allAssignedTask=await Task.find({assignedTo:_id});
        const allIAssigned=await Task.find({createdBy:_id})
        if(allAssignedTask)
        {
            res.status(201).json({message:"success",task:{assignedByYou:allIAssigned,assignedToYou:allAssignedTask}});
        }
        else
        {
            res.status(404).json({message:"Task not found"});
        }    
    }
    catch(err)
    {
        // res.json({err:err.message})
    }
}

const deleteTask=async(req,res)=>{

    const{id}=req.query
    const{_id}=req.userDetails

    try{
        
        const findTask=await Task.findById(id);
        if(!findTask)
        {
            res.status(404).json({message:"Task not found"})
        }

        if(deletedTask && findTask?.createdBy===_id)
        {
            const deletedTask=await Task.deleteOne({_id:id});
            if(!deletedTask)
            {
                res.status(401).json({message:"failed to delete task"});
            }
            res.status(201).json({message:"task deleted successfully"});
        }
        else
        {
            res.status(404).json({message:"Task not found"});
        }    
    }catch(err)
    {
        res.status(400).json({msg:"something went wrong",err})
    }
}

const getTaskAnalytics=async(req,res)=>{

    const{startDate,endDate}=req.body

    try{
        const allAssignedTask=await Task.
                count({
                    isCompleted:true,
                    $and:[{ createdAt: { $gte:new Date(new Date(startDate).setUTCHours(0, 0, 0, 0)) 
                    } 
                }, { createdAt: { $lte: new Date(endDate) } }]})
        const allIAssigned=await Task.count({isCompleted:true});
        if(allAssignedTask || allIAssigned)
        {
            res.status(201).json({message:"success",task:{assignedByYou:allIAssigned,assignedToYou:allAssignedTask}});
        }
        else
        {
            res.status(404).json({message:"Task not found"});
        }    
    }
    catch(err)
    {
        // res.json({err:err.message})
    }
}




module.exports={createTask,updateTask,getSingleTask,getAllTask,deleteTask,getTaskAnalytics}