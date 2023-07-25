import mongoose, {Schema,model,models} from "mongoose";

const promptSchema= new Schema({
    creator:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    prompt:{
        type:"string",
        required:[true,"Prompt is required."],
    },
    tag:{
        type:String,
        required:[true,"tag is required."],
    }
});

const Prompt= models.Prompt || model("Prompt",promptSchema);
export default Prompt;