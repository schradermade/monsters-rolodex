import React from 'react';
import './App.css';
import { CardList } from './card-list/card-list.component.jsx';
import { SearchBox } from './search-box/search-box.component';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: ''
    };
  }

  // componentDidMount() {
  //   fetch('https://jsonplaceholder.typicode.com/users')
  //     .then(response => response.json())
  //     .then(users => this.setState({ monsters: users }));
  // }

  handleChange = e => {
    this.setState({ searchField: e.target.value })
  }

  async componentDidMount() {
    const response = await fetch('https://tfdyxyrcw3.execute-api.us-east-1.amazonaws.com/Development/');
    const body = await response.json();
    this.setState({monsters: body})
  }

  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );
    return (
      <div className='App'>
        <h1>Monsters Rolodex</h1>
        {/* REUSABLE COMPONENT WE CAN USE IN MULTIPLE PLACES */}
          <SearchBox
            placeholder='search monsters'
            handleChange={ this.handleChange }
          />
        <CardList monsters={filteredMonsters}/>
      </div>
    );
  }
}

export default App;
