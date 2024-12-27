import express from 'express';

const expressApp = express();

expressApp.get('/ping', (req, res) => {
  res.send('pong');
});

expressApp.listen(3000, () => {
  console.log('Server started on port 3000');
});
