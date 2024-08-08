const express=require('express');
const app=express();
const port=process.env.PORT || 3000;
var colors = require('colors');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.get('/',function(req,res){
    const payload ={
        pageTitle:'Twitter',
    }
    res.render('home',payload);
})

app.use((error, req, res , next ) => {

    if (error.response) {
      console.log('error response ',error.response);
        res.status(error.response.status).send(error.response.data);
    }

    else if (error.request) {
        console.log('error request',error.request);
        res.status(error.request.status || 400).send(error.response.data || 'Bad Request');
    }
    else {
        res.status(500).send(error.message);
    }
});
app.listen(port,()=>{
    console.log(`Listening on port ${port}`.green);
})