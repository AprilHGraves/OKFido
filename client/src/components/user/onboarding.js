import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Mutation, Query } from 'react-apollo';
import Queries from '../../graphql/queries';
import Mutations from '../../graphql/mutations';
const { GET_USER, GET_USER_PREFS } = Queries;
const { UPDATE_USER } = Mutations;

class Onboarding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "start",
      message: "",
      error: false,
      username: "",
      zipcode: "",
      distance: "",
      sizes: [],
      genders: [],
      ages: []
    };

  }

  getMsg(page, field, value) {
    let msg = "";
    switch (page) {
      case "username":
        if (value === "") {
          msg = <div className="red-txt">Your username can't be blank!</div>;
        } else if (value.length < 2) {
          msg = <div className="red-txt">Sorry, that username is too short.</div>;
        } else {
          msg = <div className="green-txt">{value}. Has a nice ring to it.</div>
          return { msg, err: false }
        }
        return { msg, err: true }
      case "have":
        const dupState = Object.assign({}, this.state);
        dupState[field] = value;
        const allFilled = (!dupState.hasDogs || !dupState.hasCats || !dupState.hasChildren);
        return { msg, err: allFilled}
      case "zipcode":
        if (value && value > 9999 && value < 100000) {
          msg = <div className="green-txt">Ahh, {value}.</div>
          return { msg, err: false}
        } else {
          msg = <div className="red-txt">Zipcode must be 5 characters.</div>
        }
        return { msg, err: true}
      case "distance":
        if (value !== "" && value > 0 && value <= 500) {
          return { msg, err: false }
        } else {
          msg = <div className="red-txt">Please put a number 1 - 500.</div>
        }
        return { msg, err: true }
      case "sizes": case "genders": case "ages":
        return { msg, err: value.length < 1}
      default:
        return { msg, err: false }
    }
  }

  alterState(key) {
    return (event) => {
      let { msg, err } = this.getMsg(this.state.page, key, event.target.value);
      this.setState({ [key]: event.target.value, message: msg, error: err });
    }
  }

  modStateArray(key) {
    return (event) => {
      const arr = this.state[key].slice(0);
      const ele = event.target.value;
      if (arr.includes(ele)) {
        const idx = arr.indexOf(ele);
        arr.splice(idx, 1);
      } else {
        arr.push(ele);
      }
      let { msg, err } = this.getMsg(this.state.page, key, arr);
      this.setState({ [key]: arr, message: msg, error: err})
    }
  }

  switchPage(page, currIdx, nextIdx) {
    return (event) => {
      event.preventDefault();
      if (!this.state.error || nextIdx < currIdx) {
        let { msg, err } = this.getMsg(page, "", this.state[page]);
        this.setState({ page: page, message: msg, error: err});
      }
    }
  }

  getInputs() {
    const page = this.state.page;
    const inputMap = {
      username: "text",
      have: "radio",
      zipcode: "number",
      distance: "number",
      sizes: "checkboxes",
      genders: "checkboxes",
      ages: "checkboxes"
    };
    const placeholderMap = {
      username: "Username",
      zipcode: "e.g. 10001",
      distance: "number of miles"
    }
    if (inputMap[page] === "text" || inputMap[page] === "number") {
      return (
        <div className="profile-inputs">
          <div className="input-message">{this.state.message}</div>
          <div className="input-container">
            <input
              type={inputMap[page]}
              className="onboarding-input"
              value={this.state[page]}
              onChange={this.alterState(page)}
              placeholder={placeholderMap[page]}
            />
            <div className="input-icon">
              {this.state.error ? <span className="red-txt">!</span> : <i className="fas fa-check green-txt" />}
            </div>
          </div>
        </div>
      )
    } else if (inputMap[page] === "checkboxes") {
      const cbObj = {
        sizes: [
          'small',
          'medium',
          'large',
          'xlarge'
        ],
        genders: [
          'male',
          'female'
        ],
        ages: [
          'baby',
          'young',
          'adult',
          'senior'
        ]
      };
      return (
        <div className="profile-inputs">
          <ul className="white-box">
            {cbObj[page].map((el,idx) => {
              return (
                <li 
                  key={`cb${idx}`}
                  className="row"
                >
                  <label htmlFor={`checkbox-${idx}`}>
                   {el} 
                  </label>
                  <input
                    id={`checkbox-${idx}`}
                    type="checkbox"
                    className="form-checkbox"
                    value={el}
                    checked={this.state[page].includes(el)}
                    onChange={this.modStateArray(page)}
                  />
                </li>
              )
            })}
          </ul>
        </div>
      )
    } else if (inputMap[page] === "radio") {
      return (
        <div className="profile-inputs">
          <div className="white-box">
            <div className="row">
              <span>Dog(s)</span>
              <div className="radio-buttons" >
                <label htmlFor="has-dogs-true">
                  True
                </label>
                <input
                  id="has-dogs-true"
                  className="form-radio"
                  type="radio" 
                  value={true}
                  name="hasDogs" 
                  checked={this.state.hasDogs === "true"}
                  onChange={this.alterState("hasDogs")}
                /> 
                
                <label htmlFor="has-dogs-false">
                  False
                </label>
                <input
                  id="has-dogs-false"
                  className="form-radio"
                  type="radio"
                  value={false}
                  name="hasDogs"
                  checked={this.state.hasDogs === "false"}
                  onChange={this.alterState("hasDogs")}
                /> 
                
              </div>
                            
            </div>
            <div className="row">
              <span>Cat(s)</span>
              <div className="radio-buttons" >
                <label htmlFor="has-cats-true">
                  True
                </label>
                <input
                  id="has-cats-true"
                  className="form-radio"
                  type="radio"
                  value={true}
                  name="hasCats"
                  checked={this.state.hasCats === "true"}
                  onChange={this.alterState("hasCats")}
                />

                <label htmlFor="has-dogs-false">
                  False
                </label>
                <input
                  id="has-cats-false"
                  className="form-radio"
                  type="radio"
                  value={false}
                  name="hasCats"
                  checked={this.state.hasCats === "false"}
                  onChange={this.alterState("hasCats")}
                />

              </div>

            </div>
            <div className="row">
              <span>Children</span>
              <div className="radio-buttons" >
                <label htmlFor="has-children-true">
                  True
                </label>
                <input
                  id="has-children-true"
                  className="form-radio"
                  type="radio"
                  value={true}
                  name="hasChildren"
                  checked={this.state.hasChildren === "true"}
                  onChange={this.alterState("hasChildren")}
                />

                <label htmlFor="has-children-false">
                  False
                </label>
                <input
                  id="has-children-false"
                  className="form-radio"
                  type="radio"
                  value={false}
                  name="hasChildren"
                  checked={this.state.hasChildren === "false"}
                  onChange={this.alterState("hasChildren")}
                />

              </div>

            </div>
          </div>
        </div>
      )
    }
    
  }

  displayPage() {
    const page = this.state.page;
    switch (page) {
      case "start": case "mid":
        return (
          <div className="sea-blue-bg">
            <div className="onboarding-box">
              <div className="onboarding-chatbox">
                <p className="onboarding-chatbox-top">
                  {page === "start" ? (
                    "Let's start with the basics"
                  ):(
                    "What are you looking for?"
                  )}
                </p>
                <p className="onboarding-chatbox-bottom">
                  {page === "start" ? (
                    "Set up your profile to meet new dogs."
                  ):(
                    "To see the right dogs, tell us what you're into."
                  )}
                </p>
              </div>
              <div 
                className={`onboarding-img ${page === "start" ? "weird-thing":"weird-thing-2"}`}
              />
              <button
                className="blue-bg button next-btn"
                onClick={page === "start" ? this.switchPage("username", 0, 1):this.switchPage("sizes", 5, 6)}
              >
                NEXT
            </button>
            </div>
          </div>
        )
        default:
          const prompts = {
            username: "What's your username?",
            have: "I have...",
            zipcode: "Where do you live?",
            distance: "How many miles will you go?",
            sizes: "Which size(s) do you prefer?",
            genders: "Which gender(s) do you prefer?",
            ages: "Which age(s) do you prefer?"
          };
          const pageArray = [
            "start",
            "username",
            "have",
            "zipcode",
            "distance",
            "mid",
            "sizes",
            "genders",
            "ages"
          ];
          const idxMap = {
            username: 1,
            have: 2,
            zipcode: 3,
            distance: 4,
            sizes: 6,
            genders: 7,
            ages: 8
          };
          const currIdx = idxMap[page];
          const nextPage = pageArray[currIdx + 1];
          const prevPage = pageArray[currIdx - 1];
          return (
            <div className="onboarding-box">
              <div className="about-header">
                <button 
                  className="back-btn"
                  onClick={this.switchPage(prevPage, currIdx, currIdx - 1)}
                >
                  &lt;
                </button>
                <h4>{idxMap[page] < 5 ? "About you":"Ideal Dog"}</h4>
              </div>
              <h2 className="prompt">{prompts[page]}</h2>
              {this.getInputs()}
              <div className="profile-notice">
                <i className="far fa-eye" />&nbsp;&nbsp;
                <span>This info will be visible to others</span>
              </div>
              {this.state.page === "ages" ? (
                <Query query={GET_USER} variables={{token: localStorage.getItem("auth-token")}}>
                  {({ data }) => {
                    return (
                    <Mutation
                      mutation={UPDATE_USER}
                      onCompleted={data => {
                        this.props.history.push('/home')
                      }}
                      onError={err => {
                        console.log(err)
                      }}
                    >
                      {updateUser => (
                        <button
                          className={`button next-btn ${this.state.error ? "gray-bg" : "blue-bg"}`}
                          onClick={e => {
                            e.preventDefault();
                            const id = data.userByToken._id;
                            updateUser({
                              variables: {
                                id: id,
                                username: this.state.username,
                                hasDogs: this.state.hasDogs === "true",
                                hasCats: this.state.hasCats === "true",
                                hasChildren: this.state.hasChildren === "true",
                                zipcode: Number(this.state.zipcode),
                                willTravel: Number(this.state.distance),
                                likedSizes: this.state.sizes,
                                likedGenders: this.state.genders,
                                likedAges: this.state.ages
                              }
                            })
                          }}
                        >
                          SUBMIT
                        </button>
                      )}
                    </Mutation>
                    )}}
                </Query>

              ):(
                <button
                  className={`button next-btn ${this.state.error ? "gray-bg" : "blue-bg"}`}
                  onClick={this.switchPage(nextPage, currIdx, currIdx + 1)}
                >
                  NEXT
                </button>
              )}
            </div>
          )        
    }
  }

  render() {
    return (
      <div className="light-blue-bg">
        <Link to="/">
          <div className="nav">
            <div className="logo">
              <i className="fas fa-dog"></i>
              <h2>okfido</h2>
            </div>
          </div>
        </Link>
        
        {this.displayPage()}
      </div>
    )
  }
}

export default withRouter(Onboarding);