import errorHandler from 'errorhandler';
import app from './app';
const PORT = 5000;

if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler());
}

app.listen(PORT, () => {
  console.log(
    `App is running at http://localhost:%d in %s mode`,
    app.get('port'),
    app.get('env')
  );
  console.log('Press CTRL-C to stop\n');
});
