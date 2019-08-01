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
    if (!this.inside && this.state.showNav) {
      setTimeout(() => { this.inside = document.getElementById("user-dropdown")}, 100);
      document.addEventListener("mousedown", this.handleClickOutside);
    } else if (this.inside && !this.state.showNav) {
      this.inside = undefined;
      document.removeEventListener("mousedown", this.handleClickOutside);
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.inside && !this.inside.contains(event.target) && event.target.id !== 'user-pic') {
      this.setState({ showNav: false });
    }
  }

  goToPage(page) {
    return (event) => {
      this.setState({ showNav: false });
      this.props.history.push(page);
    }
  }

  toggleUserDropdown(event) {
    if (this.state.showNav) {
      this.setState({ showNav: false });
    } else {      
      this.setState({ showNav: true });
    }
  }

  render(){
    return (
      <div className="navigation">
        <div className="nav-left">
          <Link to="/">
            <i className="fas fa-dog"></i>
          </Link>
          <Link to='/browse'>Browse Matches</Link>
        </div>
        <div className="nav-right">
          <Link to="/likes">
            <i className="fas fa-star" />
          </Link>
          <Link to='/messages'>
            <i className="fas fa-comment"></i>
          </Link>
          <i
            id="user-pic"
            className="fas fa-user"
            onClick={this.toggleUserDropdown}
          />
        </div>
        {this.state.showNav && (
          <ApolloConsumer>
            {client => (
              <Query query={GET_USER_ID} variables={{ token: localStorage.getItem("auth-token") }}>
                {({ loading, error, data }) => {
                  if (loading) return "Loading..."
                  if (error) return `Error! ${error.message}`
                  return (
                    <ul
                      id="user-dropdown"
                    >
                      <li
                        className="user-dropdown-lis"
                        onClick={this.goToPage(`/users/${data.userByToken._id}`)}
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
                        onClick={e => {
                          e.preventDefault();
                          localStorage.removeItem("auth-token");
                          client.writeData({ data: { isLoggedIn: false } });
                          this.props.history.push("/");
                        }}
                      >
                        Sign Out
                      </li>
                    </ul>
                  )
                }}
              </Query>
            )}
          </ApolloConsumer>
        )}
      </div>
    )
  }
}

export default withRouter(Nav);