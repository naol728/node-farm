
const fs=require(`fs`)
const http=require("http")
const url=require("url")
const repaceTemplate=require("./modules/repaceTemplate")

////////////////////////////////
// SERVER

const data=fs.readFileSync(`${__dirname}/dev-data/data.json`,"utf-8")
const overview=fs.readFileSync(`${__dirname}/templates/overview.html`,"utf-8")
const card=fs.readFileSync(`${__dirname}/templates/card.html`,"utf-8")
const products=fs.readFileSync(`${__dirname}/templates/product.html`,"utf-8")
const dataObj=JSON.parse(data)

const server=http.createServer((req,res)=>{
      const {pathname,query}=url.parse(req.url,true)

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


