import React, { Component } from 'react';
import Search from './components/Search';
import SearchHistory from './components/SearchHistory';
import './App.css';

class App extends Component {

  state = { history: [] };

  onSubmit = (value) => {
    this.setState((state) => ({ history: [...state.history, { value, date: Date.now() }] }))
  }
  onClearHistory = () => this.setState({ history: [] })

  onRemoveItem = (item) => () => this.setState((state) => (
    { history: state.history.filter(el => item !== el) })
  )

  render() {
    const { history } = this.state;
    return (
      <div className="App">
        <Search onSubmit={this.onSubmit} />
        <SearchHistory history={history} onClearHistory={this.onClearHistory} onRemoveItem={this.onRemoveItem} />
      </div>
    );
  }
}

export default App;
