import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
    images: [
        {
            location:{type:String, requied:true},
        },
    ],
},
{
    timestamps: true,
},
{
    timestamps: true,
});

export const ImageModel = mongoose.model("Images", ImageSchema);