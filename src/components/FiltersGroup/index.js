import './index.css'
import {AiOutlineSearch} from 'react-icons/ai'

const FiltersGroup = props => {
  const {
    onCategoryChange,
    categoryOptions,
    onRatingChange,
    ratingsList,
    onChangeSearchInput,
    resetFilters,
  } = props

  const sendCategoryId = event => {
    onCategoryChange(event.target.id)
  }

  const sendRatingId = event => {
    onRatingChange(event.target.id)
  }

  const sendSearchInput = event => {
    if (event.key === 'Enter') {
      onChangeSearchInput(event.target.value)
    }
  }

  const clearfilter = () => {
    resetFilters()
  }

  return (
    <div className="filters-group-container">
      <div className="searchContainer">
        <input
          onKeyDown={sendSearchInput}
          className="searchInput"
          type="search"
          placeholder="Search"
        />
        <AiOutlineSearch />
      </div>
      <div className="refinersContainer">
        <h1>Category</h1>
        <div className="cateroryOptions">
          {categoryOptions.map(each => (
            <p id={each.categoryId} onClick={sendCategoryId}>
              {each.name}
            </p>
          ))}
        </div>
        <h2>Rating</h2>
        <ul>
          {ratingsList.map(each => (
            <li>
              <img
                onClick={sendRatingId}
                id={each.ratingId}
                className="ratingImage"
                src={each.imageUrl}
                alt={`rating ${each.ratingId}`}
              />
            </li>
          ))}
        </ul>
        <button type="button" onClick={clearfilter}>
          Clear Filters
        </button>
      </div>
    </div>
  )
}

export default FiltersGroup
