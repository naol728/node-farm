
const fs=require(`fs`)
const http=require("http")
const url=require("url")
// const textin=fs.readFileSync(`text.txt`,`utf-8`)
// console.log(textin)
// textout=`this is naol meseret :${textin} /n created at${Date.now()}`
// fs.writeFileSync(`textout.pdf`,textout)
// console.log(`write sucesfully`)

// const text=fs.readFile("text.txt","utf-8",(err,data)=>{
//     if (err) return console.log(err)
//     fs.writeFile("text2,txt",`${data} `,()=>{
//     console.log(" is writen")
// })
// })

// console.log("hello this is not from the inside")



////////////////////////////////
// SERVER
const repaceTemplate=(temp,product)=>{
let output=temp.replace(/{%PRODUCTNAME%}/g,product.productName)
output=output.replace(/{%FROM%}/g,product.from)
output=output.replace(/{%NUTRUNTS%}/g,product.nutrients)
output=output.replace(/{%IMAGE%}/g,product.image)
output=output.replace(/{%QUANTITY%}/g,product.quantity)
output=output.replace(/{%PRICE%}/g,product.price)
output=output.replace(/{%DISCRIPTION%}/g,product.description)
output=output.replace(/{%ID%}/g,product.id)
if (!product.organic) output.replace(/{%NOT_ORGANIC%}/g,"not-organic");
return output;

}
const data=fs.readFileSync(`${__dirname}/dev-data/data.json`,"utf-8")
const overview=fs.readFileSync(`${__dirname}/templates/overview.html`,"utf-8")
const card=fs.readFileSync(`${__dirname}/templates/card.html`,"utf-8")
const products=fs.readFileSync(`${__dirname}/templates/product.html`,"utf-8")
const dataObj=JSON.parse(data)

const server=http.createServer((req,res)=>{
      const {pathname,query}=url.parse(req.url,true)
    //   console.log(url.parse(req.url))
    // overview page
    if(pathname==="/" || pathname==="/overview"){
        res.writeHead(200,{
            "Content-type":"text/html"
        })

        const cardhtml=dataObj.map((el)=>repaceTemplate(card,el))
        const output=overview.replace(/{%CARD%}/g,cardhtml)
        res.end(output)
    }
    
    // products page
    else if(pathname==="/product"){
        console.log(query)
        res.writeHead(200,{
            "Content-type":"text/html"
        })
        
        const product=dataObj[query.id]
        const output=repaceTemplate(products,product)
        res.end(output)
    }

    // api
    else if(req.url=="/api"){
        res.writeHead(200,{
            "Content-type":"application/json"
        })
        res.end(data)
    }
    // not found
    else{
        res.writeHead(404,{
          "Content-type":"text/html",
          "my-own-header":"hello world",
        })
        res.end("page can not be found")
    }
})

server.listen(8000,"127.0.0.1",()=>{
    console.log("listening to the port 8000")
})


