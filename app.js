
const Logger = require('./log');
const http = require('http');




const logger = new Logger();
console.log(`222`);


logger.on('messageLoged',(arg)=> {
    console.log(`33 event listener called`, arg);
})

logger.log('haha');

const server = http.createServer((req, res) => {
    if(req.url === '/') {
        res.write(`hello world`);
        res.end();
    }
})

server.listen(3000);
console.log(`listening to 3000`)