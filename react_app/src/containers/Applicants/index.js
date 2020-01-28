import React, {Component} from 'react';
import View from './view';

class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      namn: '',
      kompetens: '',
      data: null,
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    fetch(`https://jsonplaceholder.typicode.com/users?id=1`)
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
    return <View 
      applicants={this.state.data} 
      loading={this.state.loading} 
      onFormChange={this.handleFormChange}
      />;
  }
}

export default index;
