import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import NavButtons from './components/NavButtons'
import Jump from './components/Jump'
import axios from 'axios'

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      jumps: [],
      jumpCount: 0
    }
  }

  //this function is ran when my component is mounted for the first time.
  //this function contacts the backend and pulls out our data and sets it to state.
  componentDidMount = () => {
    axios.get('/api/jumps').then(res => {
      this.setState({ jumps: res.data, jumpCount: res.data.length })
    })
  }

  //this function is ran when our previous button is clicked. The purpose is to go back one object in our jump array (a single jump). 
  //this function destructs jumpCount and jumps from our state. 
  previous = () => {
    let { jumpCount, jumps } = this.state;
    let prevJump = jumpCount - 1
    if (jumps.length === 0) {
      return // we are ensuring that we do not go below a jumpcount of 0.
    } else if (jumpCount === 1) {
      this.setState({
        jumpCount: jumps.length
      }) //this is saying that if our jumpCount is equal to 1 that we will set our jumpCount 
      // to jumps.length which will bring us to the last jump in our array
    } else {
      this.setState({
        jumpCount: prevJump
      }) //this is saying that if our jumpCount is > 1 then we can subtract one from the jumpCount.
    }
  }


  // this function is ran when our next button is clicked. The purpose of this function is to go forward one object in our jumps array. 
  //this function destructs jumpCount and jumps from our state. 
  next = () => {
    let { jumpCount, jumps } = this.state;
    let nextJump = jumpCount + 1
    if (jumpCount === jumps.length) {
      this.setState({
        jumpCount: 1
      }) // this is saying that if our jumpCount is equal to our arrays length we want to then 
      //go back to the start of our array. This is done so that when we get to the last jump, we will 
      // go to the start of our logbook.
    } else {
      this.setState({
        jumpCount: nextJump
      }) // this is saying that if our jumpCount is less then our arrays length we can add one 
      // to our jumpCount.
    }
  }

  // this function is ran when we add either a first jump or add a new jump into our jumps array.
  // we are destructing jumpCount and jumps from state. This function differs from our create because this function is used to 
  // update our jumpCount's state this then allows
  add = () => {
    const { jumpCount, jumps } = this.state;
    const newJump = {
      date: "",
      discipline: "",
      dropzone: "",
      jumpDetails: ""
    }
    //we are creating a variable set to new data that will be pushed into our jumps array.
    //we are doing this because add is responsible for creating new data.
    this.setState({
      jumpCount: jumpCount + 1,
      jumps: [...jumps, newJump]
    });
    // we are setting our jumpCount to jumpCount + 1 because no matter what jump we are on
    // we want to increment the jumpCount. 
    // we are setting jumps to our current jumps array but also pushing in our newJumps data using the spread operator.
    // you have to include our jumps array current data in our new state unless our new jumps.state
    // would only display our newJump.
  }


  cancelJump = () => {
    const { jumpCount, jumps } = this.state;
    jumps.splice(jumps.length - 1, 1)

    this.setState({
      jumpCount: jumpCount - 1,
      jumps: jumps
    })

  }

  // this function is responsible for taking data that was input from our user and sending 
  // it to our backend. when editJump is clicked the state is passed in as an argument from our child component Jump.js
  // we created a handleChange function that updates the values of our state on user inputs in Jump.js.
  // when actually clicked those input values are passed in as our arguments...(data)
  editJump = (data) => {
    const body = {
      date: data.dateInput,
      discipline: data.disciplineInput,
      dropzone: data.dropzoneInput,
      jumpDetails: data.jumpDetailsInput
    } // this data is the updated data sent over from Jump.js that was all input by our user or currently in the state.
    // we want the input data so that we can send it to our backend to update a new jump in our stored data.
    axios.put(`/api/jump/${data.id}`, body).then((res) => {
      this.setState({ jumps: res.data })
    })
  }

  setJumpsState = (newJumpsState) => {
    this.setState({
      jumps: newJumpsState
    })
  }

  deleteJump = (data) => {
    const { jumpCount, jumps } = this.state
    // if on jump 1 when we hit delete we subract 1 so jump count is 0 
    // because jump.length !== 0 we display the jump component with jumpCount = 0 which is wrong

    // we need to check if when deleting jump number 1 we dont set the jump count to 0, we set it to 1
    // when we set jump count to one, jump.js was checking jumpCount to determine if it needed to update state
    // we switched the check to look at jump.id and it fixed the bug
    let newJumpCount = jumpCount - 1

    //We are doing this because if we delete jump 1 and there are more jumps still in our jumps array
    // we want to decrement our jump count by 1 otherwise we will set it to 0 to allow us to add one to our 
    // jumpCount in our add function. We have to check both our jumpCount and jumps.length for us to find out
    // if there are more jumps in our jumps array. 
    if (jumpCount === 1 && jumps.length - 1) newJumpCount = 1

    axios.delete(`/api/jump/${data.id}`).then((res) => {
      this.setState({ jumps: res.data, jumpCount: newJumpCount })
    })
  }


  render() {
    const { jumps, jumpCount } = this.state;
    const currentJump = jumps[jumpCount - 1]; //we are doing this specifically to access just one jump,
    // the current jump that is being displayed by its index.


    console.log(this.state.jumps, "state in app.js")

    return (
      <div className='App' >
        <Header />

        {/* Here we are doing a ternary. We make sure the jump exists and then checks if there is an ID on it.
        If there is no ID then we want to display 'Congrats On Your New Jump!'. if the current jump does have an id we want to display
        the option to go to the next jump.  */}
        {currentJump && !currentJump.id ?
          <h1 className='wayToGo'>Congrats On Your New Jump!</h1>
          : <NavButtons previous={this.previous} next={this.next} />}

        {/* Here we are doing a ternary. We check to see if the jumps array has jumps in it. if it does not we 
        display an add first jump button that allows us to then create a jump. If the jumps array has jumps in it
        we then display the rest of our Jump.js component. */}
        {jumps.length === 0 ?
          <button className='addButton' onClick={this.add}>ADD FIRST JUMP</button>
          : (
            <Jump
              jump={currentJump}
              jumpCount={jumpCount}
              edit={this.editJump}
              delete={this.deleteJump}
              addAlways={this.add}
              cancelled={this.cancelJump}
              setJumpsState={this.setJumpsState}
            />
          )}

      </div >

    )
  }

}