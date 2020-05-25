
const express = require('express')
const app = express()
const jumpCtrl = require('./controller/jumpsLogged')
const SERVER_PORT = 6969

app.use(express.json())
//FULL CRUD
app.get('/api/jumps', jumpCtrl.getJumps)              //Create
app.post('/api/jump', jumpCtrl.createJump)            //Read  
app.put('/api/jump/:jump_id', jumpCtrl.editJump)      //Update  
app.delete('/api/jump/:jump_id', jumpCtrl.deleteJump) //Delete

app.listen(SERVER_PORT, () => console.log(`Log them up on port ${SERVER_PORT}`))
