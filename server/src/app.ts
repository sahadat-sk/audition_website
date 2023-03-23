import express from 'express';
const app = express();

app.use(express.json());

app.set('port', process.env.PORT || 5000);
app.set('env', process.env.NODE_ENV || 'development');

app.get('/ping', (req, res) => {
  res.send('pong');
});

export default app;
