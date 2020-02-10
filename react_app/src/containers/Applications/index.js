import React, {Component} from 'react';
import {connect} from 'react-redux';
import View from './view';
import {getAreaOfExpertise, submitForm} from './actions';
import Submission from "./Submission/index.js";

const withRouter = require('react-router-dom').withRouter;

class Applications extends Component {
  constructor(props) {
    super(props);
    this.state = {
    areaOfExpertise: '',
    yearsOfExperience: '',
    date: [new Date(), new Date()],
    data: '',
    };
  }

    handleDateSelect = (date) => {
        this.setState({date})
    };

    handleFormChange = (e) => {
        this.resetErrorMessage();
        const value = e.target.value;
        const name = e.target.name;
        this.setState({ [name]: value });
    };

    handleFormSubmit = (e) => {
        e.preventDefault();
        const { areaOfExpertise, yearsOfExperience, date, } = this.state;

        const data = {
            areaOfExpertise,
            yearsOfExperience,
            date,
        };
        this.props.submitForm(data);
    };
    resetErrorMessage = () => {
        const { error } = this.props;
        if (error) {
            this.props.resetError();
        }
    };


  render() {
    const { error, loading, list } = this.props;
    return <View
        error={error}
        loading={loading}
        expertiseDropDown={list}
        date={this.state.date}
        onFormSubmit={this.handleFormSubmit}
        onFormChange={this.handleFormChange}
        onDateSelect={this.handleDateSelect}
        component={<Submission/>}
    />;
  }
}

const mapStateToProps = (state, initialProps) => {
    const { loading, error, list } = state.applications;
    return {
        loading: loading,
        error: error,
        list: list,
    };
};

const mapDispatchToProps = {
    getAreaOfExpertise,
    submitForm
};

export default connect(mapStateToProps, mapDispatchToProps,)(withRouter(Applications));
