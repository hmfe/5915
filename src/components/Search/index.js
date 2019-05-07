import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { fetchCities } from '../../actions'
import SearchResults from '../SearchResults'
import './styles.css'

class Search extends PureComponent {
    state = { value: '' };

    handleOnKeyDown = (e) => {
        const { onSubmit } = this.props;
        const { key, target: { value } } = e;
        if (key === 'Enter') {
            onSubmit(value)
            e.preventDefault();
        }
    }

    selectItem = (value) => () => {
        this.props.onSubmit(value)
        this.setState({ value: '' })
    }

    clear = () => this.setState({ value: '' })

    onChange = (e) => {
        const { search } = this.props;
        const { target: { value } } = e;
        this.setState({ value });
        search(value);
    }

    render() {
        const { value } = this.state;
        const { result } = this.props;
        return (
            <>
                <div className="searchForm">
                    <input role="search" tabIndex="1" className="searchInput" onChange={this.onChange} onKeyDown={this.handleOnKeyDown} value={value} />
                    {<button aria-label="Clear search" disabled={!value} className="clearButton" onClick={this.clear}>
                        <svg height="40" width="40">
                            <path strokeWidth="1" stroke="#A2A2A2" d="M 15,15 L 25,25 M 25,15 L 15,25" /></svg>
                    </button>}
                </div>
                <SearchResults result={result} query={value} selectItem={this.selectItem} />
            </>
        )
    }
}



const mapDispatchToProps = {
    search: (query) => fetchCities(query)
}

export default connect(null, mapDispatchToProps)(Search)