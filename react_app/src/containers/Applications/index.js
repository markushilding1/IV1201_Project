import React, {Component} from 'react';
import {connect} from 'react-redux';
import View from './view';
import {getAreaOfExpertise} from './actions';

const withRouter = require('react-router-dom').withRouter;

class Applications extends Component {
  constructor(props) {
    super(props);
    this.state = {
    areaOfExpertise: '',
    yearsOfExperience: '',
    fromDate:'',
    toDate:'',
    };
  }

    handleFormChange = (e) => {
        this.resetErrorMessage();
        const value = e.target.value;
        const name = e.target.name;
        this.setState({ [name]: value });
    };

    handleFormSubmit = (e) => {
        e.preventDefault();
        const { areaOfExpertise, yearsOfExperience, fromDate, toDate } = this.state;

        const data = {
            areaOfExpertise,
            yearsOfExperience,
            fromDate,
            toDate,
        };

    };
    resetErrorMessage = () => {
        const { error } = this.props;
        if (error) {
            this.props.resetError();
        }
    };


  render() {
      const { error, loading } = this.props;
      this.props.getAreaOfExpertise();
    return <View
        error={error}
        loading={loading}
        onFormSubmit={this.handleFormSubmit}
        onFormChange={this.handleFormChange}
        areaOfExperties={}
    />;
  }
}

const mapStateToProps = (state, initialProps) => {
    const { loading, error } = state.applications;
    return {
        loading: loading,
        error: error,
    };
};

const mapDispatchToProps = {
    getAreaOfExpertise
};

export default connect(mapStateToProps, mapDispatchToProps,)(withRouter(Applications));
