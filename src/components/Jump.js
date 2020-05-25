import React, { Component } from 'react'

export default class Jump extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: "",
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
      this.setJumpDataToState(jump) // we pass in jump because this will set the current jump we are looking
      // at to our current updated state.
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

  // this function is responsible for setting the jump data to state. it takes in jump as an argument
  // because that is equal to the current jump we are looking at in our array of jumps. jump comes into
  // this component via props.
  setJumpDataToState(jump) {
    this.setState({
      id: jump.id,
      dateInput: jump.date,
      disciplineInput: jump.discipline,
      dropzoneInput: jump.dropzone,
      jumpDetailsInput: jump.jumpDetails
    })
  }
  // this function is responsible for updating our state on every event(e)/each key 
  // the user inputs and setting that new data to state.
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { jumpCount, jump } = this.props;
    const { dateInput, disciplineInput, dropzoneInput, jumpDetailsInput } = this.state
    // grabbing this data from this.state allows us to update it via our handleChange function... we are setting the value
    // of our inputs in our divs to the value of our updated state to be displayed.

    return (
      <div className='logCardButtons'>  {/* extra div to allow us to add our ternary later. */}

        <div className='logCard' >

          <div className='jumpNumber'> {/* displays our current jumpNumber to our jumpCount from state. */}
            <p>Jump Number: {jumpCount}</p>
          </div>

          <div className='jumpInfo'>
            <div className='smallInput'>
              <label className='dateText'>Date:</label>
              <input name="dateInput" value={dateInput} onChange={(e) => this.handleChange(e)} />
            </div> {/* This displays the date of our current jump. */}

            <div className='smallInput'>
              <label className='dateText'>Discipline:</label>
              <input name="disciplineInput" value={disciplineInput} onChange={(e) => this.handleChange(e)} />
            </div> {/* This displays what kind of jump we did aka the discipline */}

            <div className='smallInput'>
              <label className='dateText'>Dropzone:</label>
              <input name="dropzoneInput" value={dropzoneInput} onChange={(e) => this.handleChange(e)} />
            </div> {/* This displays the value we have in state the represents what dropzone 
            the jump was made at. */}

          </div>

          <div className='extraJumpInfo'>

            <div className='jumpDetails bigInput'>
              <label > Jump Details:</label>
              <input name='jumpDetailsInput' value={jumpDetailsInput} onChange={(e) => this.handleChange(e)} />
            </div> {/* This is where we display our jumpDetails*/}

            <div className='jumpImage bigInput'>
              <label>Insert Image Here:</label>
              <input />
            </div>

          </div>

        </div>

        {/* We check jump Id because if it doesn't exist we display create button other wise
      we display our other buttons. */}
        {!jump.id ?
          <div className='twoButtons'>
            <button className='button create' onClick={() => this.props.create(this.state)}>Create</button>
            <button className='button' onClick={() => this.props.cancelled(this.state)}>Cancel</button>
          </div>
          : (
            <div className='funButtons'>
              <button className='button' onClick={() => this.props.delete(this.state)}>Delete Jump</button>
              <button className='button' onClick={() => this.props.edit(this.state)}>Save Jump</button>
              <button className='button' onClick={() => this.props.addAlways(this.state)}>Add Jump</button>
            </div>
          )}
      </div >
    )
  }
}


