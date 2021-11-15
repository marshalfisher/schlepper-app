const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./router');
const fileUpload = require('express-fileupload')

const port = 3001;

const corsConfig = {
    origin: 'http://localhost:3000',
    credentials: true,
  };
  
app.use(cors(corsConfig));
app.use(express.json());
app.use(fileUpload())
app.use(router);
app.get('*', (req, res) => {
  res.status(404).send('Page Not Found');
});

app.listen(port, (e) => {
    if (e) {
      console.log(e);
    } else {
      console.log(`Listening on http://localhost:${port}`);
    }
  });
  