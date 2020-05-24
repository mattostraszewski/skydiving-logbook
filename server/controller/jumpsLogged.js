const jumps = [
  {
    id: 10,
    date: '04/16/2020',
    discipline: 'Freefly',
    dropzone: 'Skydive Arizona',
    jumpDetails: "Fun exit with friends",
    image: 'image'
  },
  {
    id: 20,
    date: '04/19/2020',
    discipline: 'Belly',
    dropzone: 'Skydive Arizona',
    jumpDetails: "Fun jump with friends",
    image: 'image'
  },
  {
    id: 30,
    date: '04/20/2020',
    discipline: 'Freefly',
    dropzone: 'Skydive Utah',
    jumpDetails: "Fun head down with friends",
    image: 'image'
  },
  {
    id: 40,
    date: '04/21/2020',
    discipline: 'High Pull',
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

  // this function is obtaining data from our req.body which contains all details about a jump.
  createJump: (req, res) => {
    const { date, discipline, dropzone, jumpDetails, image } = req.body
    const newJump = { id, date, discipline, dropzone, jumpDetails, image }
    jumps.push(newJump) // we are then pushing this new information to our jumps array which is creating a new jump on our array.
    id++ // got to increment our id so that each jump can be accessed by id. this is important as we do use the jumps ids in other places.
    res.status(200).send(jumps)
  },


  // this function is obtaining data from our req.body which contains all details about a jump.
  editJump: (req, res) => {
    const { date, discipline, dropzone, jumpDetails } = req.body
    const { jump_id } = req.params

    const index = jumps.findIndex(e => e.id === +jump_id)
    //creating a variable called index that is able to find a specific jump based on its id.

    if (index === -1) {
      return res.status(404).send("Jump not found")
    } else {
      const updatedJump = { id: +jump_id, date, discipline, dropzone, jumpDetails }
      jumps.splice(index, 1, updatedJump)
      //delete our current jump at that index and replace it with the updatedJump. 
    } res.status(200).send(jumps)
  },

  // this function is obtaining a specific jump_id which is used to find the jump in our jumps array.
  deleteJump: (req, res) => {
    const { jump_id } = req.params
    const index = jumps.findIndex((e) => e.id === +jump_id)

    if (index === -1) {
      return res.status(404).send("Jump not found")
    } else {
      jumps.splice(index, 1)
      // deleting our whole element at the specific index that was found by matching elements id to the id passed in by our params.
    } res.status(200).send(jumps)
  }
}