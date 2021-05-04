import React from "react";
import ReactSelect from "react-select";
import { Badge } from "react-bootstrap";


const components = {
  Control: props => (<div className="custom-select without-height" {...props.innerProps}>{props.children}</div>),
  MultiValueContainer: props => (<Badge variant="light" {...props.innerProps}>{props.children}</Badge>),
  MultiValueLabel: props => (<span {...props.innerProps}>{props.children}</span>),
  MultiValueRemove: props => (<span {...props.innerProps}>×</span>),
  IndicatorsContainer: () => null,
};


const styles = {
  control: () => ({}),
  input: () => ({display: "inline"}),
  valueContainer: () => ({}),
  multiValue: () => ({fontSize: "inherit", fontWeight:"inherit", marginRight:"0.5em", marginBottom:"0.2ex"}),
  multiValueLabel: () => ({}),
  multiValueRemove: () => ({paddingLeft:"0.5em", color:"#ccc", cursor:"pointer", ":hover":{color: "#444"}}),
};


function Select(props) {
  return (<ReactSelect components={components} styles={styles} {...props}/>);
}


export default Select;
