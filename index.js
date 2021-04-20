import express from 'express';
import Joi from 'joi';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());

const memories = [
    {id:35245558, name: 'AlphaGo', place: 'Africa', travelDate:"2020-08-18", tags: "green, 🐘, 🌲 safari", message: "Awesome trip to the safari with lots of wild🐍 animals" },
    {id:60502138, name: 'BetaRun', place: 'Australia', travelDate:"2019-07-16", tags: "kangaroo,🦘, 🐨, kiwi", message: "love the opera house 🧑‍🎤" },
    {id:50502138, name: 'CharilieDrive', place: 'Antarctica', travelDate:"2018-06-12", tags: "penguin, cold, 🏔️", message: "the penguin was so cute! Bring some extra clothing!" },
    {id:10345638, name: 'DeltaSkid', place: 'South America', travelDate:"2017-12-03", tags: "Santiago,🍹 Tequila, 🌮, Salsa", message: "It was amazing vacation! The scenes 🏖️were mesmerizing!" },
];


// Routes
app.get('/', (req, res) => {
    res.send('Hello Chuong');
});

app.get('/api/memories', (req, res)=>{
    res.send(memories);
});

// Find memory
app.get('/api/memories/:id', (req, res)=>{
    const memory = memories.find(c => c.id === parseInt(req.params.id));
    if(!memory) res.status(404).send('Unable to find the memory with given ID');
    res.send(memory);
});
//  Create memory
app.post('/api/memories', (req, res) =>{
    res.setHeader('Content-Type', 'application/json');
    const memory = {
        id: parseInt(`${Math.random().toString().substr(2, 8)}`, 10),
        name: req.body.name,
        place: req.body.place,
        travelDate: req.body.travelDate,
        tags: req.body.tags, 
        message: req.body.message
    };
    memories.push(memory);
    res.send(memory);
});
// Delete memory
app.delete('/api/memories/:id', (req, res) =>{
    // Look up memory if not found -> return 404
    const memory = memories.find(c => c.id === parseInt(req.params.id));
    if(!memory) {
        res.status(404).send('Unable to find the memory with given ID');
        return;
    }
    // if found , delete
    const index = memories.indexOf(memory);
    memories.splice(index, 1);
    // Return the same memory
    res.send(memory);

} );

// Update memory
app.put('/api/memories/:id', (req, res) => {
    // Look up the memory   // If not exsit , return 404
    const memory = memories.find(c => c.id === parseInt(req.params.id));
    if(!memory){
        res.status(404).send('Unable to fidn the memory with given ID');
        return;
    } 

    // Validate  // if invalid return 400 - Bad request
    const { error } = validatememory(req.body);  // Obj destructuring
    if (error) {
        // return 400 for bad request
        res.status(400).send(error.details[0].message);
        return;
    }
    // Update memory   // return the updated memory
    memory.name = req.body.name;
    memory.place = req.body.place;
    memory.travelDate = req.body.travelDate;
    memory.tags = req.body.tags;
    memory.message = req.body.message;
    res.send(memory);
});
//  Validate memory
function validatememory (memory) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        place: Joi.string().min(3).required(),
        travelDate: Joi.date().required(),
        tags: Joi.string().required(),
        message: Joi.string().required()
    });
    return schema.validate(memory);
}

// PORT
const port = process.env.PORT || 3000 
app.listen(port, ()=>{
    console.log(`Chuong arrived at port ${port}...`);
});