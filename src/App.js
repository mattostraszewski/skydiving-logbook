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

  componentDidMount = () => {
    axios.get('/api/jumps').then(res => {
      this.setState({ jumps: res.data, jumpCount: res.data.length })
    })
  }

  previous = () => {
    let { jumpCount, jumps } = this.state;
    let prevJump = jumpCount - 1
    if (jumps.length === 0) {
      return
    } else if (jumpCount === 1) {
      this.setState({
        jumpCount: jumps.length
      })
    } else {
      this.setState({
        jumpCount: prevJump
      })
    }
  }

  next = () => {
    let { jumpCount, jumps } = this.state;
    let nextJump = jumpCount + 1
    if (jumps.length === 0) {
      return
    } else if (jumpCount === jumps.length) {
      this.setState({
        jumpCount: 1
      })
    } else {
      this.setState({
        jumpCount: nextJump
      })
    }
  }

  add = () => {
    // we want to update our jumps state with key value
    // pairs set to empty strings.
    //we need to update our jumpCount +1

    let { jumpCount } = this.state
    this.setState({
      jumpCount: 1,
      jumps: [{
        jumpNumber: 1,
        dateInput: "",
        discipline: "",
        dropzone: "",
        jumpDetails: ""
      }]
    })
  }



  createJump = (data) => {
    const body = {
      jumpNumber: data.jumpNumber,
      date: data.dateInput,
      discipline: data.disciplineInput,
      dropzone: data.dropzoneInput,
      jumpDetails: data.jumpDetailsInput
    }
    axios.post('/api/jump', body).then((res) => {
      this.setState({ jumps: res.data })
    })
  }



  editJump = (data) => {
    const body = {
      jumpNumber: data.jumpNumber,
      date: data.dateInput,
      discipline: data.disciplineInput,
      dropzone: data.dropzoneInput,
      jumpDetails: data.jumpDetailsInput
    }
    axios.put(`/api/jump/${data.id}`, body).then((res) => {
      this.setState({ jumps: res.data })
    })
  }

  deleteJump = (data) => {
    axios.delete(`/api/jump/${data.id}`).then((res) => {
      const { jumpCount, jumps } = this.state
      // if on jump 1 when we hit delete we subract 1 so jump count is 0 
      // becuase jump.length !== 0 we display the jump component with jumpCount = 0 which is wrong

      // we need to check if when deleting jump number 1 we dont set the jump count to 0, we set it to 1
      // when we set jump count to one the jump.js was checking jumpCount to determine if it needed to update state
      // we switched the check to look at jump.id and it fixed the bug
      let newJumpCount = jumpCount - 1

      //We are doing this because if we delete jump 1 and there are more jumps still in our jumps array
      // we want to decrement our jump count by 1 otherwise we will set it to 0 to allow us to add one to our 
      // jumpCount in our add function.
      if (jumpCount === 1 && jumps.length > 1) newJumpCount = 1

      this.setState({ jumps: res.data, jumpCount: newJumpCount })
    })
  }


  render() {
    const { jumps, jumpCount } = this.state;
    const currentJump = jumps[jumpCount - 1];

    return (
      <div className='App' >
        <Header />
        <NavButtons previous={this.previous} next={this.next} />
        {jumps.length === 0 ?
          <button className='addButton' onClick={this.add}>ADD FIRST JUMP</button>
          : (
            <Jump
              jump={currentJump}
              jumpCount={jumpCount}
              { !jumps.id ? create = { this.createJump } : (
                edit = { this.editJump }
              delete={this.deleteJump}
            />)}
          )}
      </div >

    )
  }

}