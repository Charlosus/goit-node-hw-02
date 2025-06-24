const app = require('./app')

app.get('/', (req, res) => {
  res.json({ message: 'Welcome' });
});

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})
