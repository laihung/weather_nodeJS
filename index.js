const app = require('./server'); //this is where logic sit

const PORT = 3000;
const HOST = '0.0.0.0';
app.listen(PORT, HOST, undefined, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
