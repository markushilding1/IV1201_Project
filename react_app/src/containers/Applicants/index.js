import React, {Component} from 'react';
import View from './view';

class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
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

  render() {
    return <View applicants={this.state.data} loading={this.state.loading} />;
  }
}

export default index;
