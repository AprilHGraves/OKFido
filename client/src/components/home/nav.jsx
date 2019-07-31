import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import { Query, ApolloConsumer } from 'react-apollo';
import Queries from '../../graphql/queries';
const { GET_USER_ID } = Queries;

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNav: false
    };
    this.toggleUserDropdown = this.toggleUserDropdown.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.goToPage = this.goToPage.bind(this);
  }

  componentDidUpdate() {
    if (!this.inside) {
      this.inside = document.getElementById("user-dropdown");
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(event) {
    // debugger;
    if (this.inside && !this.inside.contains(event.target) && event.target.id !== 'user-pic') {
      document.removeEventListener("mousedown", this.handleClickOutside);
      this.setState({ showNav: false });
    }
  }

  goToPage(page) {
    return (event) => {
      this.toggleUserDropdown();
      this.props.history.push(page);
    }
  }

  toggleUserDropdown(event) {
    if (this.state.showNav) {
      document.removeEventListener("mousedown", this.handleClickOutside);
      this.setState({ showNav: false });
    } else {
      document.addEventListener("mousedown", this.handleClickOutside);
      this.setState({ showNav: true });
    }
  }

  render(){
    const myId = 5;
    return (
      <div className="navigation">
        <div className="nav-left">
          <Link to="/">
            <i className="fas fa-dog"></i>
          </Link>
          <Link to='/browse'>Browse Matches</Link>
        </div>
        <div className="nav-right">
          <Link to='/messages'>
            <i className="fas fa-comment"></i>
          </Link>
          <i
            id="user-pic"
            className="fas fa-user"
            onClick={this.toggleUserDropdown}
          />
          {/* <Link to="#">Logout</Link> */}
        </div>
        {this.state.showNav && (
          <ApolloConsumer>
            {client => (
              <Query query={GET_USER_ID}>
                {({ data }) => (
                  <ul
                    id="user-dropdown"
                  >
                    <li
                      className="user-dropdown-lis"
                      onClick={this.goToPage(`/users/${data._id}`)}
                    >
                      Profile
                    </li>
                    <li
                      className="user-dropdown-lis"
                      onClick={this.goToPage("/bookmarks")}
                    >
                      Bookmarks
                    </li>
                    <li
                      className="user-dropdown-lis"
                    >
                      Sign Out
                    </li>
                  </ul>
                )}
              </Query>
            )}
          </ApolloConsumer>
        )}
      </div>
    )
  }
}

export default withRouter(Nav);