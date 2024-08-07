const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

app.use(express.static('dummy'))
const app = express();
app.get('/info' , (req, res)=>{
  res.status(200).json({info : "something"});
})

// Correct CORS Configuration
// const corsOptions = {
//   origin: 'http://127.0.0.1:5500/', // Replace with the actual frontend URL
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
//   optionsSuccessStatus: 204
// };

// app.use(cors(corsOptions));
// app.use(express.json());

// // Database connection
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '123456',
//   database: 'anime_project_db'
// });

// db.connect((err) => {
//   if (err) {
//     console.error('Database connection failed:', err.stack);
//     return;
//   }
//   console.log('Connected to database.');
// });

// // Route to handle catalog interactions
// app.post('/api/interaction', (req, res) => {
//   const { catalog_id, metadata } = req.body;

//   // Insert interaction data into the database
//   const query = 'INSERT INTO CatalogInteractions (catalog_id, metadata) VALUES (?, ?)';
//   db.query(query, [catalog_id, JSON.stringify(metadata)], (err, result) => {
//     if (err) {
//       console.error('Error inserting data:', err);
//       return res.status(500).send('Server error');
//     }
//     res.status(201).send('Interaction data saved successfully');
//   });
// });

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
