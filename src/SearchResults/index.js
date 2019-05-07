import React from 'react';
import { connect } from 'react-redux'
import './styles.css';

const renderHightlight = (string, highlight) => {
  const spilts = string.split(new RegExp(`(${highlight})`, 'gi'));
  return <> {spilts.map((s, i) => s.toLowerCase() === highlight.toLowerCase() ? <span className="resultItem--bold" key={i}>{s}</span> : <span key={i}>{s}</span>)
  } </>
}

const SearchResult = ({ isFetching, selectItem, query, results = {} }) => {

  const result = results[query];

  const keyClick = (name) => (e) => e.key === 'Enter' && selectItem(name)();

  if (isFetching) {
    return <ul className="result">
      <li>Loading...</li>
    </ul>
  }

  if (!!query && (!result || result.length === 0)) {
    return <ul className="result">
      <li>No result</li>
    </ul>
  }

  return !!result && result.length !== 0 && !!query &&
    <ul className="result">
      {result.map(item =>
        <li role="button" aria-label={item.name} key={item.numericCode} tabIndex="1" className="resultItem" onKeyDown={keyClick(item.name)} onClick={selectItem(item.name)}>
          {renderHightlight(item.name, query)}
        </li>
      )}
    </ul>
}




const mapStateToProps = state => ({
  results: state.results,
  isFetching: state.isFetching,
})


export default connect(mapStateToProps)(SearchResult)