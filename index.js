const express = require('express');
const morgan = require('morgan');
const app = express();
const {mongoose} = require('./database');
const cors = require('cors');
var path = require('path');

// Static files
//app.use(express.static(__dirname + 'public'));
app.use(express.static(path.join(__dirname, 'public')));

// Settings
app.set('port', process.env.PORT || 3000);

var bodyParser = require('body-parser'); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
// Middlewares
app.use(morgan('dev'));
app.use(cors({origin: 'http://localhost:4200'}));

// Routes
app.use('/api/employees',require('./routes/employee.routes'));
app.use('/api/locales',require('./routes/local.routes'));
app.use('/api/listaLocal',require('./routes/listaLocal.routes'));
app.use('/api/usuarios',require('./routes/usuarios.routes'));

app.get('/*', (req, res) => {
    res.sendFile(__dirname+'/public/index.html', function(err) {
        if (err) {
            res.sendFile(__dirname+'/public/index.html')
        }
      })
    
})

// Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})