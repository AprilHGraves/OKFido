import React from 'react'
import DogSearchIndex from '../dogs/DogSearchIndex';

class SearchFilters extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      queryParams: {
        coat: [],
        gender: [],
        size: [],
        age: [],
        distance: 50,
        location: 45202
      },
      possibleOptions: {
        coat: [
          "Hairless",
          "Short",
          "Medium",
          "Long",
          "Wire",
          "Curly"
        ],
        gender: ["Male", "Female"],
        size: ["Small", "Medium", "Large", "XLarge"],
        age: [
          "Baby",
          "Young",
          "Adult",
          "Senior"
        ]
      },
      filterOptionsToggled: {
        age: false,
        coat: false,
        gender: false,
        distance: false
      }
    }
    this.toggleOptions = this.toggleOptions.bind(this);
    // this.update = this.update.bind(this);
  }

  toggleOptions(option){
    this.setState(
      {filterOptionsToggled: 
        {...this.state.filterOptionsToggled, 
          [option]: !this.state.filterOptionsToggled[option]
        }
      }
    )
  }

  createFormInput(option){
    return (
    <label htmlFor={`${option}`} key={`${option}`}>
      {option}
      <input
        type="text"
        id={`${option}`}
        value={this.state.queryParams[option]}
        className="form-input"
        onChange={this.update(option)}
        checked
      ></input>
      
    </label>
    )
  }

  createFormCheckbox(option){
    let possibleOptions = this.state.possibleOptions[option];
    let possibleOptionsHTML = possibleOptions.map((label, idx) => {
      let checked = false;
      if (this.state.queryParams[option].includes(label)){
        checked = true;
      }
      if (checked){
        return (
          <label htmlFor={`${option}-${idx}`} key={`${option}-${idx}`}>
            <input
              type="checkbox"
              id={`${option}-${idx}`}
              value={label}
              className="form-checkbox"
              onChange={this.update(option)}
              checked
            ></input>
            {label}
          </label>
        )
      } else {
        return (
          <label htmlFor={`${option}-${idx}`} key={`${option}-${idx}`}>
            <input 
              type="checkbox" 
              id={`${option}-${idx}`} 
              value={label} 
              className="form-checkbox" 
              onChange={this.update(option)}
              ></input>
            {label}
          </label>
        )
      }
    })

    return (
      <form>
        {possibleOptionsHTML}
      </form>
    )
  }

  update(field){
    return e => {
      if(field !== "distance" && field !== "location"){
        let currValues = this.state.queryParams[field];
        let newValues = currValues.slice(0);
        if (newValues.includes(e.target.value)){
          newValues = newValues.filter(value => value !== e.target.value)
        } else {
          newValues.push(e.target.value)
        }
        this.setState(
          {queryParams:
            {...this.state.queryParams,
              [field]: newValues
            }
          }
        )
      } else {
        this.setState(
          {
            queryParams:
            {
              ...this.state.queryParams,
              [field]: e.target.value
            }
          }
        )
      }
    }
  }

  showText(field){
    let text = "";
    this.state.queryParams[field].forEach((option, idx) => {
      if (idx < this.state.queryParams[field].length - 1){
        if(field === "coat" || field === "size"){
          text += option.toLowerCase() + " or "
        } else {
          text += option.toLowerCase() + ", "
        }
      } else {
        text += option.toLowerCase()
      }
    })
    if (this.state.queryParams[field].length === 0 || this.state.queryParams[field].length === this.state.possibleOptions[field].length){
      text = `all ${field}s`
    }
    return text;
  }

  render(){
    let ageToggle = this.state.filterOptionsToggled.age ? "show" : "";
    let coatToggle = this.state.filterOptionsToggled.coat ? "show" : "";
    let genderToggle = this.state.filterOptionsToggled.gender ? "show" : "";
    let distanceToggle = this.state.filterOptionsToggled.distance ? "show" : "";
    let locationToggle = this.state.filterOptionsToggled.location ? "show" : "";
    let sizeToggle = this.state.filterOptionsToggled.size ? "show" : "";

    return (
      <div className="search-container">
        <div className="search-container">
          <div className="search-filters-container">
            <div className="search-filters">

              {/* SIZE */}
              <span>Dogs of </span>
              <span className="search-filters-wrapper">
                <button className="open-filter" onClick={() => this.toggleOptions("size")}>
                  {this.showText("size") !== "all sizes" ? "a " + this.showText("size") : this.showText("size")}
                  {this.showText("size") !== "all sizes" ? " size" : ""}
                </button>
                <div className={`filter-search-options size-options ${sizeToggle}`}>
                  <div className="contents">
                    {this.createFormCheckbox("size")}
                  </div>
                  <div className="tail"></div>
                </div>
              </span>

              {/* AGE */}
              <span> that are </span>
              <span className="search-filters-wrapper">
                <button className="open-filter" onClick={() => this.toggleOptions("age")}>
                  {this.showText("age")}
                </button>
                <div className={`filter-search-options age-options ${ageToggle}`}>
                  <div className="contents">
                    {this.createFormCheckbox("age")}
                  </div>
                  <div className="tail"></div>
                </div>
              </span>

              {/* COAT */}
              <span> with </span>
              <span className="search-filters-wrapper">
                <button className="open-filter" onClick={() => this.toggleOptions("coat")}>
                  {this.showText("coat") !== "all coats" ? "a " + this.showText("coat") : this.showText("coat")}
                  {this.showText("coat") !== "all coats" ? " coat" : ""}
                </button>
                <div className={`filter-search-options coat-options ${coatToggle}`}>
                  <div className="contents">
                    {this.createFormCheckbox("coat")}
                  </div>
                  <div className="tail"></div>
                </div>
              </span>

              {/* GENDER */}
              <span> that are </span>
              <span className="search-filters-wrapper">
                <button className="open-filter" onClick={() => this.toggleOptions("gender")}>
                  {this.showText("gender") === "all genders" ? "both male and female" : this.showText("gender")}
                </button>
                <div className={`filter-search-options gender-options ${genderToggle}`}>
                  <div className="contents">
                    {this.createFormCheckbox("gender")}
                  </div>
                  <div className="tail"></div>
                </div>
              </span>

              {/* DISTANCE */}
              <span> that live within </span>
              <span className="search-filters-wrapper">
                <button className="open-filter" onClick={() => this.toggleOptions("distance")}>
                  {this.state.queryParams.distance}
                </button>
                <div className={`filter-search-options distance-options ${distanceToggle}`}>
                  <div className="contents">
                    {this.createFormInput("distance")}
                  </div>
                  <div className="tail"></div>
                </div>
              </span>

              <span> miles from </span>
              <span className="search-filters-wrapper">
                <button className="open-filter" onClick={() => this.toggleOptions("location")}>
                  {this.state.queryParams.location}
                </button>
                <div className={`filter-search-options distance-options ${locationToggle}`}>
                  <div className="contents">
                    {this.createFormInput("location")}
                  </div>
                  <div className="tail"></div>
                </div>
              </span>
              {/* <button 
                id="search"
                onClick={this.performSearch.bind(this)}
                >Search</button> */}
            </div>
          </div>
        </div>
        <DogSearchIndex searchParams={this.state.queryParams}/>
      </div>
    )
  }
}

export default SearchFilters;