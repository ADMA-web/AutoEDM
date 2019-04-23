const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 3000;

app.set( 'view engine', 'pug' );
//app.set('views', path.join(__dirname, '/output'));

app.use( express.static( 'public' ) );
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/dga', (req, res) => res.render(path.join(__dirname+'/views/dga'),
    {title: 'DGA Newsletter'}));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));