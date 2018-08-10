import * as React from 'react';
import { Link } from "react-router-dom";

interface TabsProps {
  selected: number;
  children: any;
};

interface TabsState {
  selected: number;
};

export class Tabs extends React.Component<TabsProps, TabsState> {
  constructor(props, context) {
    super(props, context);
    this.getInitialState = this.getInitialState.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this._renderContent = this._renderContent.bind(this);
    this._renderTitles = this._renderTitles.bind(this);
    this._renderContent = this._renderContent.bind(this);
    this.state = this.getInitialState();
  }
  getInitialState() {
    return {
      selected: this.props.selected
    };
  }

  handleClick(index, event) {
    event.preventDefault();
    this.setState({
      selected: index
    });
  }


  componentWillReceiveProps(nextProps) {
    if (this.props.selected !== nextProps.selected) {
      this.setState({ selected: nextProps.selected });
    }
  }

  _renderTitles() {
    function labels(child, index) {
      let activeClass = (this.state.selected === index ? 'active' : '');
      return (
        (child && child.props && child.props.label) ? 
          <li key={index} className={activeClass} data-index={index} data-label={child.props.label} >
          <a href="#"
            onClick={this.handleClick.bind(this, index)}>
            {child && child.props && child.props.label}
          </a>
        </li>: '');
    }
    return (
      <ul className="nav nav-tabs">
        {this.props.children.map(labels.bind(this))}
      </ul>
    );
  }

  _renderContent() {
    return (
      <div className="tab-pane fade active in">
        {this.props.children[this.state.selected]}
      </div>
    );
  }

  render() {
    return (
      <div className="tabs">
        {this._renderTitles()}
        {this._renderContent()}
      </div>
    );
  }
}

interface PaneProps {
  label: string;
  children: any;
}

export class Pane extends React.Component<PaneProps> {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return (
      <div className="tab-content">
        {this.props.children}
      </div>
    );
  }
}
