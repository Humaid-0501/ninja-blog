const express =require('express');
const morgan = require('morgan');
const monsgoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// connect to mongoDB
const dbURI = 'mongodb+srv://nodeblogs:test1234@cluster0.dcvxa.mongodb.net/node-project?retryWrites=true&w=majority';
monsgoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => app.listen(3000))
.catch((err) => console.log(err));

// express app
const app = express();

app.set('view engine', 'ejs');



// static files
app.use(express.static('public'));

// third party middleware
app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));



// mongoose & mongo tests
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
      title: 'new blog 2',
      snippet: 'about my new blog',
      body: 'more about my new blog'
    })
  
    blog.save()
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
});


app.get('/all-blogs', (req, res) => {
Blog.find()
    .then(result => {
    res.send(result);
    })
    .catch(err => {
    console.log(err);
    });
});
  
app.get('/single-blog', (req, res) => {
Blog.findById('5ea99b49b8531f40c0fde689')
    .then(result => {
    res.send(result);
    })
    .catch(err => {
    console.log(err);
    });
});
// // Middleware
// app.use((req, res, next) => {
//     console.log('new request made:');
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method: ', req.method);
//     next();
//   });

app.get('/',(req,res)=>{
    // res.send('<p>Home page</p>');

    // res.sendFile('./views/index.html', {root: __dirname});

    // const blogs = [
    //     {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //   ];
    //   res.render('index', { title: 'Home', blogs }); 

    res.redirect('/blogs');

});

app.get('/about',(req,res)=>{
    // res.send('<p>Home page</p>');
    // res.sendFile('./views/about.html', {root: __dirname});
    res.render('about', {title:'About'})

});

// redirect
// app.get('/about-us',(req,res)=>{
//     res.redirect('/about');
// });

// blog routes
app.use('/blogs',blogRoutes);

// 404
app.use((req,res)=>{
    // res.status(404).sendFile('./views/404.html', {root:__dirname});
    res.status(404).render('404', {title:'404'});
});
