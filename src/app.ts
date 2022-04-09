import express from 'express';
import {Request, Response} from 'express'
const app = express();

const port:number = 3000;

app.get('/:id', (req: Request<{id: string}, undefined, undefined, {name: string}> , res: Response) => {
  const name: string = req.query.name;
  const id: string = req.params.id;
  console.log('hello world', name, id);
  res.status(200).json({success: true});
});

app.listen(port, () => console.log(`App started in development mode at port: ${port}`));