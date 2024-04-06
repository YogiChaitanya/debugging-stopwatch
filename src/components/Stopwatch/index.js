import {Component} from 'react'
import './index.css'

class Stopwatch extends Component {
  state = {
    isTimerRunning: false,
    timeElapsedInSeconds: 0,
  }

  componentWillUnmount() {
    clearTimeout(this.timeInterval)
  }

  onStopTimer = () => {
    clearInterval(this.timeInterval)
    this.setState({isTimerRunning: false})
  }

  onResetTimer = () => {
    clearInterval(this.timeInterval)
    this.setState({
      isTimerRunning: false,
      timeElapsedInSeconds: 0,
    })
    // this.setState({isTimerRunning: false})
  }

  // mistake1 i wrote like this
  // this.setState(prevState => ({timeElapsedInSeconds: prevState + 1,}))
  updateTime = () => {
    this.setState(prevState => ({
      timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
    }))
  }

  onStartTimer = () => {
    this.setState(prevState => ({
      isTimerRunning: true,
      ...prevState,
    }))
    // this.setState({isTimerRunning: true})

    this.timeInterval = setInterval(this.updateTime, 1000)
  }

  renderSeconds = () => {
    const {timeElapsedInSeconds} = this.state

    const seconds = Math.floor(timeElapsedInSeconds % 60)

    // else if (seconds > 60) {return 0}
    if (seconds < 10) {
      return `0${seconds}`
    }
    return seconds
  }

  renderMinutes = () => {
    const {timeElapsedInSeconds} = this.state

    const minutes =
      timeElapsedInSeconds === 0 ? 0 : Math.floor(timeElapsedInSeconds / 60)
    console.log(timeElapsedInSeconds, minutes)
    if (minutes < 10) {
      return `0${minutes}`
    }
    return minutes
  }

  render() {
    const {isTimerRunning} = this.state

    const time = `${this.renderMinutes()}:${this.renderSeconds()}`
    console.log('time ', time)
    return (
      <div className="app-container">
        <div className="stopwatch-container">
          <h1 className="stopwatch">Stopwatch</h1>
          <div className="timer-container">
            <div className="timer">
              <img
                className="timer-image"
                src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
                alt="stopwatch"
              />
              <p className="timer-text">Timer</p>
            </div>
            <h1 className="stopwatch-timer">{time}</h1>
            <div className="timer-buttons">
              <button
                type="button"
                className="start-button button"
                onClick={this.onStartTimer}
                disabled={isTimerRunning}
              >
                Start
              </button>
              <button
                type="button"
                className="stop-button button"
                onClick={this.onStopTimer}
              >
                Stop
              </button>
              <button
                type="button"
                className="reset-button button"
                onClick={this.onResetTimer}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Stopwatch
