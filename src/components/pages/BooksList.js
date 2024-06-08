import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import withNavigation from "../higher-order-component/HigherOrderComponent";
import "./styles/books-list.css";

export class BooksList extends PureComponent {
  static propTypes = {
    navigate: PropTypes.func,
  };
  state = {
    booksList: [],
    loading: true,
    error: "",
    currentPage: 1,
    hasFetchedAllBooks: false,
    isLoadMoreBtnClicked: false,
    searchText: "",
    noOfBooks: undefined,
  };
  render() {
    const { loading, error, hasFetchedAllBooks } = this.state;
    return (
      <div>
        {error && this.renderError()}
        {loading ? this.renderLoading() : this.renderBooksList()}
        {!hasFetchedAllBooks && !loading && this.renderLoadMoreBtn()}
      </div>
    );
  }

  componentDidMount() {
    this.fetchBookLists();
  }

  renderBooksList = () => {
    const { booksList, searchText, noOfBooks } = this.state;
    const isSearchBtnEnabled = !!searchText && noOfBooks > 0;
    return booksList.length > 0 ? (
      <div>
        <div className="books-header mb-4">
          <h4>List of Books</h4>
          <div>
            <input
              type="text"
              placeholder="Search Books..."
              value={searchText}
              onChange={this.handleSearchTextChange}
            />
            <input
              type="number"
              value={noOfBooks}
              placeholder="No of Books"
              onChange={this.handleNoChange}
              min={1}
              max={20}
            />
            <button
              disabled={!isSearchBtnEnabled}
              onClick={this.handleSearch}
              className="btn"
            >
              <i class="fa fa-search"></i>
            </button>
          </div>
        </div>

        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>BookID</th>
              <th>Title</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {booksList.map((item) => (
              <tr key={item.bookID}>
                <td>{item.bookID}</td>
                <td>{item.title}</td>
                <td className="button-container">
                  <button onClick={() => this.editBook(item)}>Edit</button>
                  <button onClick={() => this.deleteBook(item)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <div>No Books Found</div>
    );
  };

  renderLoading = () => {
    return <div className="text-center">Loading...</div>;
  };

  renderLoadMoreBtn = () => {
    return (
      <div className="text-center">
        <button onClick={this.loadMore}>Load More</button>
      </div>
    );
  };

  handleSearchTextChange = (e) => {
    this.setState({
      searchText: e.target.value,
    });
  };

  handleNoChange = (e) => {
    this.setState({
      noOfBooks: e.target.value,
    });
  };

  fetchBookLists = async () => {
    const { currentPage, booksList, isLoadMoreBtnClicked } = this.state;
    const response = await axios.get(
      `/api/method/frappe-library?page=${currentPage}`
    );
    if (response?.data) {
      const { message } = response?.data;
      this.setState({
        booksList: isLoadMoreBtnClicked ? [...booksList, ...message] : message,
        loading: false,
        isLoadMoreBtnClicked: false,
      });
    } else {
      this.setState({
        error: "Failed to fetch books",
      });
    }
  };

  loadMore = () => {
    this.setState(
      (prevState) => {
        return {
          loading: true,
          currentPage: prevState.currentPage + 1,
          isLoadMoreBtnClicked: true,
        };
      },
      () => {
        this.fetchBookLists();
      }
    );
  };

  editBook = async (item) => {
    console.log(item);
    await axios.put(`/api/method/frappe-library/${item.bookID}`, {
      title: "Changed title",
      authors: "KW",
    });
    this.setState(
      {
        loading: true,
      },
      () => {
        this.fetchBookLists();
      }
    );
  };

  deleteBook = async (item) => {
    this.setState({
      loading: true,
    });
    await axios.delete(`/api/method/frappe-library/${item.bookID}`);
    this.fetchBookLists();
  };

  handleSearch = () => {
    console.log("search");
  };
}

export default withNavigation(BooksList);
