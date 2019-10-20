// Extra packages are nodemon (global) for update monitoring and morgan for request monitoring

// load our app server using express
const express = require('express')
const app = express()
// Add Morgan to Monitor the request made
const morgan = require('morgan')
// Import mysql
const mysql = require('mysql')
// Use morgan
app.use(morgan('combined'))

// Here Im Fetching the User with the id I would like to get back
app.get('/user/:id', (req, res) => {
  console.log('Fetching user with id: ' + req.params.id)
  // The Response must be ended or it will load forever

// Create a connection to the DB
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'restapi'
  })


// Create The query
  const userId = req.params.id
  const queryString = 'SELECT * FROM users WHERE id = ?'
  connection.query(queryString, [userId], (err, rows, fields) => {
    // Catching the Error
    if (err) {
      console.log('Failed to query users: ' + err)
      res.end()
      return
    }
    console.log('I think we feched users successfully')
    // res.json(rows)
    // Formatting the Data
    const users = rows.map((rows) => {
    return { firstName: rows.FirstName, lastName: rows.LastName }
  })
  res.json(users)
})

//  res.end()
})
// You must set the root and how you want to handle the request
// with a callback function of request and response (req, res)
app.get('/', (req, res) => {
  console.log('Responding to the root route')
  res.send('Hello from root')
}) 

// Making other route called users
app.get('/users', (req, res)=>{
  var user1 = {firstname: 'Hunter', lastname: 'Maxwell'}
  // Adding A second User
  const user2 = {firstname: 'Elvis', lastname: 'Presley'}
  // To pass multiple values you need to put them in an array for json
  res.json([user1, user2])
})
// Don't forget to install nodemon globally to track changes
// add the port to listen on
// Localhost:420
app.listen(420, () => {
  console.log('Dope the server is running')
})