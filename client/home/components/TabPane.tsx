import * as React from 'react';
import ui from 'redux-ui';

interface TabPaneProps {
  display: string;
  href: string;
};

interface TabPaneState {

}

class TabPane extends React.Component<TabPaneProps> {
  render() {
    return (<div>{
        this.props.children 
      }</div>);
  }
}

export default TabPane;