//To import the require modules
const { log } = require("console");
const fs = require("fs");
const http = require("http");
const url = require("url");

//To read the all files using file system
const homePage = fs.readFileSync("./index.html", "utf8");
const data = fs.readFileSync("./data.json", "utf8");
const dataObj = JSON.parse(data);
const template = fs.readFileSync("./template.html", "utf8");
const viewTemplate = fs.readFileSync("./view_Template.html", 'utf8')
const viewpage = fs.readFileSync('./view_page.html', 'utf8')

//Function for replace home page template
let replaceTemp = (temp, product) => {
  let data = temp.replace(/{%NAME%}/g, product.category);
  data = data.replace(/{%ID%}/g, product.id);
  data = data.replace(/{%PRICE%}/g, product.price);
  data = data.replace(/{%TITLE%}/g, product.title);
  data = data.replace(/{%RATING%}/g, product.rating.rate);
  data = data.replace(/{%BUYERS%}/g, product.rating.count);
  data = data.replace(/{%IMAGE%}/g, product.image);
  data = data.replace(/{%DESCRIPTION%}/g, product.description);
   //this description part if it exist it will replace otherwise it will skip
  return data;
};


//To Create a server using http'
const server = http.createServer((req, res) => {
  //console.log('Req.url :',req.url)
  let { query, pathname } = url.parse(req.url);
  // console.log("Query :", query);
  // console.log("Pathname :", pathname);

  if (pathname === "/" || pathname === "/home") {
    res.writeHead(200, { "Content-type": "text/html" });
    let products = dataObj
      .map((product) => replaceTemp(template, product))
      .join("");
    let sendres = homePage.replace(/{%PRODUCTS%}/g, products);
    res.end(sendres);

  } else if (pathname == "/product") {
    res.writeHead(200, {'content-tpye': 'text/html'})
    const productId = query.slice(3);
    const viewProduct = dataObj[productId - 1]
    let result = replaceTemp(viewTemplate, viewProduct)
    let view = viewpage.replace(/{%VIEW_PRODUCT%}/g, result)
    res.end(view)
    

  } else if (pathname === "/data") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(data);
  }
});

server.listen(8080, () => {
  console.log("Hey server is listening on the port 8080");
});
