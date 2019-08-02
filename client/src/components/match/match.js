import React from 'react'

class MatchPercent extends React.Component {
  render(){

    let matchedCriteria = {
      hasChildren: false,
      hasDogs: false,
      hasCats: false,
      likedSizes: false,
      likedGenders: false,
      likedAges: false,
    }
    Object.keys(this.props.dog).forEach(attr => {
      if (attr === "age"){
        matchedCriteria.likedAges = this.props.userPrefs.likedAges.includes(this.props.dog["age"].toLowerCase())
      } else if (attr === "gender"){
        matchedCriteria.likedGenders = this.props.userPrefs.likedGenders.includes(this.props.dog["gender"].toLowerCase())
      } else if (attr === "size"){
        matchedCriteria.likedSizes = this.props.userPrefs.likedSizes.includes(this.props.dog["size"].toLowerCase())
      } else if (attr === "environment"){
        if (this.props.dog.environment.children === null && !this.props.userPrefs.hasChildren) {
          matchedCriteria.hasChildren = true;
        }
        if (this.props.dog.environment.cats === null && !this.props.userPrefs.hasCats) {
          matchedCriteria.hasCats = true;
        }
        if (this.props.dog.environment.dogs === null && !this.props.userPrefs.hasDogs) {
          matchedCriteria.hasCats = true;
        }
        else if (this.props.dog.environment.children 
          && this.props.dog.environment.cats
          && this.props.dog.environment.dogs){
            matchedCriteria.hasChildren = (this.props.userPrefs.hasChildren === this.props.dog.environment.children) 
            matchedCriteria.hasDogs = (this.props.userPrefs.hasDogs === this.props.dog.environment.dogs) 
            matchedCriteria.hasCats = (this.props.userPrefs.hasCats === this.props.dog.environment.cats) 
          }
      }
    })
    let numMatches = Object.values(matchedCriteria).filter(val => val).length;
    let percent = Math.floor((numMatches / 6) * 100);

    return (<span>{percent}%</span>)

  }
              
}

export default MatchPercent;