import { connectDB } from "@utils/database";
import Prompt from "@models/prompt";

// Get (Read)
export const GET = async (req,{params})=>{
   
    try {
        await connectDB();
      const prompt=await Prompt.findById(params.id).populate('creator');
      if(!prompt) return new Response("Prompt not found",{status:404});

      return new Response(JSON.stringify(prompt),{status:200});

        
        
    } catch (error) {
        return new Response("Failed to create the new prompt",{status:500});
        console.log(error);
    }
}

// Patch

export const PATCH= async (req,{params})=>{

    console.log(params.id);
    const {prompt,tag}=await req.json();
    try {
        await connectDB();
        const existingPrompt =await Prompt.findById(params.id);
        if(!existingPrompt) return new Response("Prompt not found",{status:404});
        existingPrompt.prompt=prompt;
        existingPrompt.tag=tag;

        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt),{status:200});
    } catch (error) {
        console.log(error)
        
    }

}

//Delete
export const DELETE= async (request,{params})=>{
   try {
    await connectDB();
    await Prompt.findByIdAndRemove(params.id);
    return new Response("Prompt is delete successfully",{status:200});
   } catch (error) {
    return new Response("Failed to delete prompt",{status:500});
    console.log(error)
   }
}


