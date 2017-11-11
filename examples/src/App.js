import React, { Component } from 'react'
import Timeline from 'react-visjs-timeline'
import moment from 'moment'
import './App.css'

const groupsExample = {
  groups: [],
  items: [],
  options: {
    groupOrder: 'content',  // groupOrder can be a property name or a sorting function
    orientation: 'top',
    margin: 30,
  },
};

const now = moment().minutes(0).seconds(0).milliseconds(0);
const tailCount = 4;
const itemCount = 10;

groupsExample.groups.push(
  { id: 0, content: 'N310QS' },
  { id: 1, content: 'N305QS' },
  { id: 2, content: 'N303QS' },
  { id: 3, content: 'N201QS' },
  { id: 4, content: 'N512QS', nestedGroups: [0, 1] },
  { id: 5, content: 'N515QS', nestedGroups: [2] },
  { id: 6, content: 'N519QS', nestedGroups: [3] },
  { id: 7, content: 'N530QS' },  
)

// create a dataset with items
for (let i = 0; i < itemCount; i++) {
  const start = now.clone().add(Math.random() * 48, 'hours');
  const end = start.clone().add(Math.random() * 5 + 1, 'hours');
  const group = Math.floor(Math.random() * tailCount);
  groupsExample.items.push({
    id: i,
    group,
    start,
    end,
    type: 'range'
  });
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedIds: []
    }
  }

  render() {
    return (
      <div className="App">
        <Timeline
          {...groupsExample}
          clickHandler={this.clickHandler.bind(this)}
          selection={this.state.selectedIds}
        />
      </div>
    );
  }

  clickHandler(props) {
    const { group } = props
    const selectedIds = groupsExample.items.filter(item => item.group === group).map(item => item.id)
    this.setState({
      selectedIds
    })
  }
}

export default App
