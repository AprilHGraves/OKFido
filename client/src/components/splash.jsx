import React from 'react'

class Splash extends React.Component {
  constructor(props) {
    super(props);

    this.bgImageClasses = [
      'splash-container splash-bg-1', 
      'splash-container splash-bg-2', 
      'splash-container splash-bg-3',
    ];

    this.bgColorClasses = [
      'splash-container splash-bg-1-color',
      'splash-container splash-bg-2-color',
      'splash-container splash-bg-3-color',
    ]

    this.bgNum = 0;
    this.state = {
      currentBg: this.bgImageClasses[this.bgNum]
    }
  }

  componentDidMount(){
    this.bgInterval = setInterval(() => {
      this.rotateBG();
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.bgInterval);
  }

  rotateBG() {
    this.setState({ currentBg: this.bgColorClasses[this.bgNum % 3] })
    this.bgNum++;
    setTimeout( () => {
      this.setState({ currentBg: this.bgImageClasses[this.bgNum % 3] })
    }, 100)
  }

  render() {
    return (
      <div className={this.state.currentBg}>
        <h1>ADOPTION DESERVES <br /> BETTER</h1>
        <p>
          On OkAdopt, you're more than just a photo. You have
          a home to share, time to play, and a heart big enough
          to care for another living creature. Get noticed for your
          great choice in dog toys, and your large backyard. Because
          you deserve a dog to cuddle with.
        </p>
      </div>
    )
  }
}

export default Splash;