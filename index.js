const app = require('./api/app');
const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`App started on port: ${port}`));
