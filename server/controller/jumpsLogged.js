const jumps = [
  {
    id: 10,
    jumpNumber: 1,
    date: '04/16/2020',
    discipline: 'freefly',
    dropzone: 'Skydive Arizona',
    jumpDetails: "Fun exit with friends",
    image: 'image'
  },
  {
    id: 20,
    jumpNumber: 2,
    date: '04/19/2020',
    discipline: 'belly',
    dropzone: 'Skydive Arizona',
    jumpDetails: "Fun jump with friends",
    image: 'image'
  },
  {
    id: 30,
    jumpNumber: 3,
    date: '04/20/2020',
    discipline: 'freefly',
    dropzone: 'Skydive Utah',
    jumpDetails: "Fun head down with friends",
    image: 'image'
  },
  {
    id: 40,
    jumpNumber: 4,
    date: '04/21/2020',
    discipline: 'high pull',
    dropzone: 'Skydive CrossKeys',
    jumpDetails: "Highpull with friends",
    image: 'image'
  }
]
let id = 1

module.exports = {
  getJumps: (req, res) => {
    res.status(200).send(jumps)
  },

  createJump: (req, res) => {
    const { jumpNumber, date, discipline, dropzone, jumpDetails, image } = req.body
    const newJump = { id, jumpNumber, date, discipline, dropzone, jumpDetails, image }
    jumps.push(newJump)
    id++
    res.status(200).send(jumps)
  },

  editJump: (req, res) => {
    const { jumpNumber, date, discipline, dropzone, jumpDetails } = req.body
    const { jump_id } = req.params

    const index = jumps.findIndex(e => e.id === +jump_id)

    if (index === -1) {
      return res.status(404).send("Jump not found")
    } else {
      const updatedJump = { id: +jump_id, jumpNumber, date, discipline, dropzone, jumpDetails }
      jumps.splice(index, 1, updatedJump)
    } res.status(200).send(jumps)
  },

  deleteJump: (req, res) => {
    const { jump_id } = req.params
    console.log("here")
    const ind = jumps.findIndex((e) => e.id === +jump_id)
    if (ind === -1) {
      return res.status(404).send("Jump not found")
    } else {
      jumps.splice(ind, 1)
    } res.status(200).send(jumps)
  }
}