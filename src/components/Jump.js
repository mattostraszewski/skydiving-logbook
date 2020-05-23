import React, { Component } from 'react'

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

  // Component did mount runs once when the component is mounted.
  // Need to set the data to state to enable us top edit the inputs.
  componentDidMount() {
    const { jump } = this.props;
    if (jump) {
      this.setJumpDataToState(jump)
    }
  }

  // Runs when the component recieves new data in its props. Next or previous
  // When the jumpCount changes (next or previous is pushed) our component will need to recieve the new props/data and set them to state.
  componentWillReceiveProps(nextProps) {
    const { jump: newJump } = nextProps;
    const { jump: currentJump } = this.props;

    if (newJump && newJump.id !== currentJump.id) {
      //We are checking to see if we are on the same jump that this component 
      //thinks we are on. If the jump is the same then there is no need to update the state.
      this.setJumpDataToState(newJump)
    }
  }


  setJumpDataToState(jump) {
    this.setState({
      id: jump.id,
      jumpNumber: jump.jumpNumber,
      dateInput: jump.date,
      disciplineInput: jump.discipline,
      dropzoneInput: jump.dropzone,
      jumpDetailsInput: jump.jumpDetails
    })
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

        <button onClick={() => this.props.edit(this.state)}>Save Jump</button>

        <button onClick={() => this.props.delete(this.state)}>Delete Jump</button>

        <button onClick={() => this.props.create(this.state)}>Create Jump</button>
      </div>
    )
  }
}


