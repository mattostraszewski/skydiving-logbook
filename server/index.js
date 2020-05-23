
const express = require('express')
const app = express()
const jumpCtrl = require('./controller/jumpsLogged')
const SERVER_PORT = 6969

app.use(express.json())

app.get('/api/jumps', jumpCtrl.getJumps)
app.post('/api/jump', jumpCtrl.createJump)
app.put('/api/jump/:jump_id', jumpCtrl.editJump)
// app.delete('/api/jump/:jump_id', jumpCtrl)

app.listen(SERVER_PORT, () => console.log(`Log them up on port ${SERVER_PORT}`))
