const server = require("./src/app.js");
//requiero app y arranco la app
const { conn } = require("./src/db.js");



// Sincronizo los modelos
conn.sync({ truncate : true}).then(() => {
  server.listen(3001, () => {    
    console.log("%s listening at 3001");  
  });
});
