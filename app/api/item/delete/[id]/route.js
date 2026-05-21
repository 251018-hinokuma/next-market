import { NextResponse } from "next/server";
import connectDB from "../../../../utils/database";
import { ItemModel } from "../../../../utils/schemaModels";

export async function DELETE(request,context) {
    try {
        await connectDB()
        const resolvedParams = await context.params
        const singleItem=await ItemModel.findById(resolvedParams.id)
        //if(singleItem.email==reqBody.email){
            await ItemModel.deleteOne({_id:resolvedParams.id})
            return NextResponse.json({message:"アイテム削除成功"})
        //}else{
       //     return NextResponse.json({message:"ほかの人が作成したアイテムです"})
       // }
    } catch (error) {
        return NextResponse.json({message:"アイテム削除失敗"})
    }
   
    
}