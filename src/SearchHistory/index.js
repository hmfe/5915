import React from 'react'
import './styles.css'

const SearchHistory = ({ history, onClearHistory, onRemoveItem }) => (
  <div className="searchHistory"><h2>Search History</h2> <button className="clearHistory" onClick={onClearHistory}>Clear search history</button>
    <ul className="list">
      {history.map((item) => (
        <li key={item.date}>{item.value} {item.date} <button aria-label="Remove" title="Remove" className="clearItem" onClick={onRemoveItem(item)}>X</button></li>
      ))}
    </ul>
  </div>
)

export default SearchHistory