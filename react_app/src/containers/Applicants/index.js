import React, { Component } from 'react';
import { connect } from 'react-redux';
import View from './view';
import { permissionCheck } from './../../utils/permissionCheck';

class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      namn: '',
      kompetens: '',
      data: null,
      loading: true,
      error: null,
      authorized: false,
    };
  }

  permissionCheck() {
    const result = this.props.permissionCheck('recruiter', 'applicants');
    if (result) {
      this.setState({
        authorized: true,
      });
      if (!this.state.data) {
        this.fetchData();
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(prevProps.user) !== JSON.stringify(this.props.user) ||
      JSON.stringify(prevProps.auth) !== JSON.stringify(this.props.auth)
    ) {
      this.permissionCheck();
    }
  }

  componentDidMount() {
    this.permissionCheck();
  }

  fetchData() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          data: data,
          loading: false,
          error: null,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleFormChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    console.log(value)
    console.log(name)
    this.setState({ [name]: value }, () => console.log(this.state));
  };

  render() {
    return (
      <View
        authorized={this.state.authorized}
        applicants={this.state.data}
        loading={this.state.loading}
        onFormChange={this.handleFormChange}
      />
    );
  }
}

const mapDispatchToProps = {
  permissionCheck,
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
