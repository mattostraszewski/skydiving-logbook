import React, { Component } from 'react'
import axios from 'axios'

export default class Jump extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: "",
      jumpNumber: "",
      dateInput: "",
      disciplineInput: "",
      dropzoneInput: "",
      jumpDetailsInput: ""
    }
  }

  componentWillReceiveProps(nextProps) {
    const { jump } = nextProps;
    if (jump) {
      this.setState({
        id: jump.id,
        jumpNumber: jump.jumpNumber,
        dateInput: jump.date,
        disciplineInput: jump.discipline,
        dropzoneInput: jump.dropzone,
        jumpDetailsInput: jump.jumpDetails
      })
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { jumpCount } = this.props;
    const { dateInput, disciplineInput, dropzoneInput, jumpDetailsInput } = this.state

    return (
      <div className='logCardButtons'>
        <div className='logCard' >

          <div className='jumpNumber'>
            <p>Jump Number: {jumpCount}</p>
          </div>

          <div className='jumpInfo'>
            <div className='smallInput'>
              <label className='dateText'>Date:</label>
              <input name="dateInput" value={dateInput} onChange={(e) => this.handleChange(e)} />
            </div>
            <div className='smallInput'>
              <label className='dateText'>Discipline:</label>
              <input name="disciplineInput" value={disciplineInput} onChange={(e) => this.handleChange(e)} />
            </div>
            <div className='smallInput'>
              <label className='dateText'>Dropzone:</label>
              <input name="dropzoneInput" value={dropzoneInput} onChange={(e) => this.handleChange(e)} />
            </div>
          </div>

          <div className='extraJumpInfo'>
            <div className='jumpDetails bigInput'>
              <label > Jump Details:</label>
              <input name='jumpDetailsInput' value={jumpDetailsInput} onChange={(e) => this.handleChange(e)} />
            </div>
            <div className='jumpImage bigInput'>
              <label>Insert Image Here:</label>
              <input />
            </div>
          </div>

        </div>

        <button onClick={() => this.props.edit(this.state)}>Save</button>
      </div>
    )
  }
}


