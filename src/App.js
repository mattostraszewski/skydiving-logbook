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
    console.log(data)
    axios.delete(`/api/jump/${data.id}`).then((res) => {
      const { jumpCount } = this.state
      // if on jump 1 when we hit delete we subract 1 so jump count is 0 
      // becuase jump.length !== 0 we display the jump component with jumpCount = 0 which is wrong

      // we need to check if when deleting jump number 1 we dont set the jump count to 0, we set it to 1
      // when we set jump count to one the jump.js was checking jumptCount to determine if it needed to jumpdate state
      // we switched the check to look at jump.id and it fixed the bug
      let newJumpCount = jumpCount - 1
      if (jumpCount === 1) newJumpCount = 1

      this.setState({ jumps: res.data, jumpCount: newJumpCount })
    })
  }


  render() {
    const { jumps, jumpCount } = this.state;
    const currentJump = jumps[jumpCount - 1];
    console.log(this.state.jumps)
    console.log(currentJump)

    return (
      <div className='App' >
        <Header />
        <NavButtons previous={this.previous} next={this.next} />
        {jumps.length === 0 ?
          <p>ADD FIRST JUMP</p>
          : (
            <Jump
              jump={currentJump}
              jumpCount={jumpCount}
              // create={this.createJump}
              edit={this.editJump}
              delete={this.deleteJump}
            />
          )}
      </div >

    )
  }

}