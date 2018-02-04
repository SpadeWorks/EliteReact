import * as React from 'react';
import ui from 'redux-ui';
import * as $ from 'jquery';

interface TabbedAreaProps {
  updateUI: (any) => any;
  ui: any;
}

@ui({
  state: {
      activeTab: 0
  }
})

class TabbedArea extends React.Component<TabbedAreaProps> {
    constructor(props, context) {
      super(props, context);
      this.handleClick = this.handleClick.bind(this);
  }
  handleClick (index: number) {
    this.props.updateUI({
      activeTab: index
    });
  }

    render(){
      const { children, ui, updateUI} = this.props;
      var tabNodes = [];
      $.each(children, (index, child) => {
        var className = ui.activeTab === index ? 'active' : '';
        if(index!=0)
          className =  className+" pull-right";
        tabNodes.push(
          <li className={className} onClick={this.handleClick.bind(null, index)} key={index}>
            <a href={child.props.href} data-toggle="tab">{child.props.display}</a>
          </li>
        );
      });
     
  
      return (  
        <div>      
          <ul className="nav nav-tabs">
            {tabNodes}
          </ul>            
          </div>    
      );
    }
  }

  export default TabbedArea;