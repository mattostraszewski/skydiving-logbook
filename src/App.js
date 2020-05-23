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



  // createJump = () => {
  //   const body = { jumpNumber, date, discipline, dropzone, jumpDetails, image }
  //   axios.post('/api/jump', body).then((res) => {
  //     this.setState({ jumps: res.data })
  //   })
  // }



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

  render() {
    const { jumps, jumpCount } = this.state;
    const currentJump = jumps[jumpCount - 1];
    console.log(this.state.jumps)

    return (
      <div className='App'>
        <Header />
        <NavButtons previous={this.previous} next={this.next} />
        <Jump
          jump={currentJump}
          jumpCount={jumpCount}
          // create={this.createJump}
          edit={this.editJump}
        // delete={this.deleteJump}
        />
      </div >

    )
  }

}
