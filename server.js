const app = require('./app');

const port = process.env.port  || 5000;

app.listen(port, () => {
    console.log('Port is running on 5000 enjoy coding..');
});