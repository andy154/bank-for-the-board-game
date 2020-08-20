const fs = require('fs');
const path = require('path');

const MIME = {};
MIME['.html'] = 'text/html';
MIME['.js'] = 'text/javascript';
MIME['.css'] = 'text/css';

function main(request, response){

  let url = request.path.slice(1) || 'index.html';
  let sourcePath = `./source/${url}`;
  let file = (fs.existsSync(sourcePath)) ? fs.readFileSync(sourcePath) : null;
  
  if(file){
    let type = MIME[path.extname(sourcePath)] || 'text/plain';
    response.writeHead(200, {'Content-Type': type});
    response.end(file);
  }else{
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.end('404 Not Found');
  }

}

module.exports = main;
