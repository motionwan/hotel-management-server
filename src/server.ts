import express from 'express';
const app = express();

app.listen('3006', (): void => {
  console.log('Server started on port 3006');
});
