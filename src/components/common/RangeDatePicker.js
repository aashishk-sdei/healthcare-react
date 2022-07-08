import React from "react";
import classNames from "classnames";
import {
  InputGroup,
  DatePicker,
  InputGroupAddon,
  InputGroupText
} from "shards-react";

import "../../assets/range-date-picker.css";

class RangeDatePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      endDate: props.oneMonthBack ? new Date(props.oneMonthBack) : undefined,
      startDate: props.currentDate ? new Date(props.currentDate) : undefined,
      maxDate: new Date()
    };

    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
  }

  handleStartDateChange(value) {
    let _obj = {
      ...this.state,
      ...{ startDate: new Date(value) }
    };
    this.setState(_obj);
    if(this.props.currentDate){
      this.props.handleDownload(_obj);
    }
  }

  handleEndDateChange(value) {
    let _obj = {
      ...this.state,
      ...{ endDate: new Date(value) }
    };
    this.setState(_obj);
    if(this.props.oneMonthBack){
      this.props.handleDownload(_obj);
    }
  }

  focousOutOnStartDate(value) {
    if(!value){
      let _obj = {
        ...this.state,
        ...{ startDate: undefined, endDate: undefined }
      };
      this.setState(_obj);
      if(this.props.currentDate){
        this.props.handleDownload(_obj);
      }
    }
  }

  focousOutOnEndDate(value) {
    if(!value){
      let _obj = {
        ...this.state,
        ...{ endDate: undefined }
      };
      this.setState(_obj);
      if(this.props.oneMonthBack){
        this.props.handleDownload(_obj);
      }
    }
  }
  
  render() {
    const { className } = this.props;
    const classes = classNames(className, "d-flex", "my-auto", "date-range");

    return (
      <InputGroup className={classes}>
        <DatePicker
          size="sm"
          selected={this.state.startDate}
          maxDate={this.state.endDate ? this.state.endDate: new Date()}
          onChange={this.handleStartDateChange}
          placeholderText="Start Date"
          dropdownMode="select"
          className="text-center"
          onBlur={event => this.focousOutOnStartDate(event.target.value)}
        />
        <DatePicker
          size="sm"
          selected={this.state.endDate}
          minDate={this.state.startDate}
          maxDate={new Date()}
          onChange={this.handleEndDateChange}
          onBlur={event => this.focousOutOnEndDate(event.target.value)}
          placeholderText="End Date"
          dropdownMode="select"
          className="text-center"
        />
        <InputGroupAddon type="append">
          <InputGroupText>
            <i className="material-icons">&#xE916;</i>
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    );
  }
}

export default RangeDatePicker;
