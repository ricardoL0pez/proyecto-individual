const server = require('./src/app.js');
const { conn } = require('./src/db.js');

conn.sync({ alter: true }).then(() => { //{ force: true }
  server.listen(3001, () => {
    console.log('%s listening at 3001'); 
  });
});

/*inicialización del servidor*/