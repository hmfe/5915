import React from 'react'
import './styles.css'

const dateFormatter = new Intl.DateTimeFormat('sv-SE', {
  year: 'numeric', month: 'numeric', day: 'numeric',
  hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true
})

const SearchHistory = ({ history, onClearHistory, onRemoveItem }) => (
  <div className="searchHistory"><h2>Search History</h2> <button className="clearHistory" onClick={onClearHistory}>Clear search history</button>
    <ul className="historyItems">
      {history.map((item) => (
        <li className="historyItem" key={item.date}>
          <span className="historyItem-name">{item.value}</span>
          <span>{dateFormatter.format(item.date)}</span>
          <button aria-label="Remove" title="Remove" className="clearItem" onClick={onRemoveItem(item)}>
            <svg height="20" width="20">
              <path strokeWidth="1" stroke="#A5A5A5" d="M 5,5 L 15,15 M 15,5 L 5,15" /></svg>
          </button>
        </li>
      ))}
    </ul>
  </div>
)

export default SearchHistory