import './index.css'
import {AiOutlineSearch} from 'react-icons/ai'

const FiltersGroup = props => {
  const {
    onCategoryChange,
    categoryOptions,
    onRatingChange,
    ratingsList,
    onChangeSearchInput,
  } = props

  const sendCategoryId = event => {
    onCategoryChange(event.target.id)
  }

  const sendRatingId = event => {
    onRatingChange(event.target.id)
  }

  const sendSearchInput = event => {
    onChangeSearchInput(event.target.value)
  }

  return (
    <div className="filters-group-container">
      <div className="searchContainer">
        <input
          onChange={sendSearchInput}
          className="searchInput"
          type="search"
          placeholder="Search"
        />
        <AiOutlineSearch />
      </div>
      <div className="refinersContainer">
        <h2>Category</h2>
        <ul className="cateroryOptions">
          {categoryOptions.map(each => (
            <li id={each.categoryId} onClick={sendCategoryId}>
              {each.name}
            </li>
          ))}
        </ul>
        <h2>Rating</h2>
        <ul>
          {ratingsList.map(each => (
            <li>
              <img
                onClick={sendRatingId}
                id={each.ratingId}
                className="ratingImage"
                src={each.imageUrl}
                alt={each.ratingId}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default FiltersGroup
