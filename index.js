import 'dotenv/config'
import {database} from  "./database/database.js"
import app from "./app.js"

database.then(()=>{
  const port = process.env.PORT || 3000;
  app.listen(port, function() {
    console.log(`Listening on port ${port}`);
  });
}).catch((err)=>{
  console.error(err)
  process.exit()
})