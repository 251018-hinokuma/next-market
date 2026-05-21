import { jwtVerify } from "jose"
import { NextResponse } from "next/server"

export async function proxy(request) {
    
    //const token="eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImR1bW15QGVtYWlsLmNvbSIsImV4cCI6MTc3NzM0MjYyOX0.Ub47BX2X-wmVDXpbuFFHSuANevnsZ8sRQyTJ7blyOtE"

    const authHeader = request.headers.get("Authorization")
    if(!authHeader){ //修正箇所はここ
        return NextResponse.json({message:"トークンがありません"})
    }
    const token=await authHeader.split(" ")[1]
    
    if(!token){
        return NextResponse.json({message:"トークンがありません"})
    }
    try{
        const secretKey=new TextEncoder().encode("next-market-app-book")
        const decodedJwt=await jwtVerify(token,secretKey)
        console.log("decodedJwt",decodedJwt)

        return NextResponse.next()
    }catch{
        return NextResponse.json({message:"トークンが正しくないので、ログインしてください"})
    }
    
    
}

export const config={
    matcher:["/api/item/create","/api/item/update/:path*","/api/item/delete/:path*"],
}