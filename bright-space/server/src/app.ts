import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 8080;



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use(express.static("build"));

const items = [
  {
    name: "Laptop", 
    price: 1000
    },
  {
    name: "Desktop", 
    price: 2100
    },
];


app.get('/api/items', (req: Request, res: Response) => {
    res.send(items);
})
