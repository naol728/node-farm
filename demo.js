const url=require("url")
const fs=require("fs")
const http=require("http")
const data=fs.readFileSync(`${__dirname}/txt/input.txt`,"utf-8")
const dataObj={}
const lines=data.split("\n")
for(let i=0;i<lines.length;i+=2){
    const key=lines[i].trim();
    const value=lines[i+1].trim()
    dataObj[key]=value
}

fs.writeFileSync("output.json",JSON.stringify(dataObj,null,2))

console.log("conversion complited")

console.log(dataObj)
const server=http.createServer((req,res)=>{
     const {pathname,query}=url.parse(req.url,true)

    console.log(pathname)
    console.log(query)
})
server.listen(8000,"127.0.0.1",()=>{
    console.log("listenning ")
})