import React from 'react'

class SplashFooter extends React.Component {
  render(){
    return (
      <div className="splash-footer-container">
        <div className="splash-footer-column">
          <h1>Technologies</h1>
          <ul>
            <li>MongoDB</li>
            <li>ExpressJS</li>
            <li>React</li>
            <li>GraphQL</li>
            <li>Apollo</li>
            <li>Heroku</li>
            <li>Docker</li>
          </ul>
        </div>
        <div className="splash-footer-column">
          <h1>Developers</h1>
          <ul>
            <li className="dev-name">Christie Brandao</li>
            <li><a href="https://github.com/cbrandao18">Github</a></li>
            <li><a href="https://www.linkedin.com/in/christiebrandao/">LinkedIn</a></li>
          </ul>
          <br />
          <ul>
            <li className="dev-name">April Graves</li>
            <li><a href="https://github.com/AprilHGraves">Github</a></li>

          </ul>
        </div>
        <div className="splash-footer-column">
          <h1>Description</h1>
          <ul>
            <li>Clone of OKCupid built in one week.</li>
          </ul>
        </div>

      </div>
    )
  }
}

export default SplashFooter;