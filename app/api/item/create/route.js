import {NextResponse} from "next/server"
import connectDB from "../../../utils/database"
import { ItemModel } from "../../../utils/schemaModels"
export async function GET() {
    return NextResponse.json({massage:"アイテム作成"})
}
export async function POST(request) {

    const reqBody =await request.json()
    console.log(reqBody)
    try {
        
        await connectDB()
        await ItemModel.create(reqBody)
        return NextResponse.json({massage:"アイテム作成"})
    } catch (error) {
        return NextResponse.json({massage:"アイテム失敗"})
    }
    
}