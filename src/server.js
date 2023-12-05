const app = require('./app');
const port = 9876;

app.listen(port, () => console.log('server running at ' + port));