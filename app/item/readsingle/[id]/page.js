import Image from "next/image"  
import Link from "next/link" 
import Header from "../../../components/header"
import Footer from "../../../components/footer"
const getSingleItem = async(id) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`, {cache: "no-store"})
    const jsonData = await response.json() 
    const singleItem = jsonData.singleItem
    return singleItem 
}  

const ReadSingleItem = async(context) => {
    const singleparams=await context.params
    const singleItem = await getSingleItem(singleparams.id)
    return (
        <div className="grid-container-si">
            <Header/>
            <div>
                <Image src={singleItem.image} width={750} height={500} alt="item-image" priority/>
            </div>
            <div>
                <h1>{singleItem.title}</h1>
                <h2>¥{singleItem.price}</h2>
                <hr/>
                <p>{singleItem.description}</p>
                <div>
                    <Link href={`/item/update/${singleItem._id}`}>アイテム編集</Link>
                    <Link href={`/item/delete/${singleItem._id}`}>アイテム削除</Link>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default ReadSingleItem