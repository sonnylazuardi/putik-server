'use strict'

const express = require('express');
const axios = require('axios');
const app = express();

app.set('port', (process.env.PORT || 3000));

app.get('/', (req, res) => {
    res.send('PUTIK is live');
});

app.listen(app.get('port'), () => {
    console.log('PUTIK will rock at ' + app.get('port'));
});