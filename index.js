const app = require('./app');
const http = require('http');
const { PORT } = require('./config');


const server = http.createServer(app);
server.listen(PORT, () => {
   console.log(`la aplicacion corre de pinga en ${PORT}`);
})
