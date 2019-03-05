const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`222222 express: listen to ${port}`)
})

const courses = [
    {id:1, name:'course1'},
    {id:2, name:'course2'},
    {id:3, name:'course3'}
];

app.get('/', (req,res) => {
    res.send('111 hellow world');
})


app.get('/api/courses', (req,res) => {
    // res.send(req.query);
    res.send(courses);
})

app.post('/api/courses', (req,res) => {
    const result = ValidateCourse(req.body);
    if(result.error){
        // 400 bad request
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
})

app.put('/api/courses/:id', (req,res) => {
    // 1 look up the course if not existing, return 404
    const course = courses.find( c => c.id == parseInt(req.params.id))
    if(!course){
        res.status(404).send({
            error:'The course with the give ID was not found',
        });
        return;
    }

    // 2 validate: if invalid return 400 -bad request
    /**
    const result = ValidateCourse(req.body);
    if(result.error){
        // 400 bad request
        res.status(400).send(result.error.details[0].message);
        return;
    }
     */

     //es6 way
    const {error} = ValidateCourse(req.body);
    if(error){
        // 400 bad request
        res.status(400).send(error.details[0].message);
        return;
    }
    

    // update course return the updated course
    course.name = req.body.name;
    res.send(course);
})

app.get('/api/courses/:id', (req,res) => {
    const course = courses.find( c => c.id == parseInt(req.params.id))
    if(!course){
        res.status(404).send({
            error:'The course with the give ID was not found',
        });
        return;
    }
    res.send(course);

})

app.get('/api/courses/:id/:name', (req,res) => {
    res.send(req.params);
})

app.delete('/api/courses/:id', (req,res) => {
    // 1 look up the course if not existing, return 404
    const course = courses.find( c => c.id == parseInt(req.params.id))
    if(!course){
        res.status(404).send({
            error:'The course with the give ID was not found',
        });
        return;
    }

    const index = courses.indexOf(course);
    courses.splice(index,1);

    res.send(courses);

})



function ValidateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(course, schema);
    console.log(`validate result:`, result);
    return result;
}