import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const fetchingStatusList = {
  success: 'SUCCESS',
  inprogress: 'IN-PROGRESS',
  failed: 'FAILED',
}

class AllProductsSection extends Component {
  state = {
    productsList: [],
    activeOptionId: sortbyOptions[0].optionId,
    activeCategoryId: '',
    activeratingId: '',
    onChangeSearchInput: '',
    fetchingStatus: fetchingStatusList.success,
  }

  componentDidMount() {
    this.getProducts()
  }

  onCategoryChange = categoryId => {
    this.setState({activeCategoryId: categoryId}, this.getProducts)
  }

  onRatingChange = ratingId => {
    this.setState({activeratingId: ratingId}, this.getProducts)
  }

  onChangeSearchInput = searchText => {
    this.setState({onChangeSearchInput: searchText}, this.getProducts)
  }

  resetFilters = () => {
    this.setState(
      {
        activeCategoryId: '',
        activeratingId: '',
        onChangeSearchInput: '',
      },
      this.getProducts,
    )
  }

  getProducts = async () => {
    this.setState({
      fetchingStatus: fetchingStatusList.inprogress,
    })
    const jwtToken = Cookies.get('jwt_token')

    const {
      activeCategoryId,
      activeOptionId,
      onChangeSearchInput,
      activeratingId,
    } = this.state
    let apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&rating=${activeratingId}&category=${activeCategoryId}&title_search=${onChangeSearchInput}`
    if (activeCategoryId !== '' && activeratingId !== '') {
      apiUrl = `https://apis.ccbp.in/products?rating=${activeratingId}&category=${activeCategoryId}&sort_by=${activeOptionId}&title_search=${onChangeSearchInput}`
    } else if (activeCategoryId === '' && activeratingId !== '') {
      apiUrl = `https://apis.ccbp.in/products?rating=${activeratingId}&sort_by=${activeOptionId}&title_search=${onChangeSearchInput}`
    } else if (activeCategoryId !== '' && activeratingId === '') {
      apiUrl = `https://apis.ccbp.in/products?category=${activeCategoryId}&sort_by=${activeOptionId}&title_search=${onChangeSearchInput}`
    }
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        fetchingStatus: fetchingStatusList.success,
        productsList: updatedData,
      })
    } else {
      this.setState({fetchingStatus: fetchingStatusList.failed})
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  renderProductsList = () => {
    const {productsList, activeOptionId} = this.state
    if (productsList.length !== 0) {
      return (
        <div className="all-products-container">
          <ProductsHeader
            activeOptionId={activeOptionId}
            sortbyOptions={sortbyOptions}
            changeSortby={this.changeSortby}
          />
          <ul className="products-list">
            {productsList.map(product => (
              <ProductCard productData={product} key={product.id} />
            ))}
          </ul>
        </div>
      )
    }
    return (
      <div className="noProductsContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
          alt="no products"
        />
        <h2>No products found</h2>
        <p>Did not found any products. try other filters</p>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
      />
    </div>
  )

  renderContent = () => {
    const {fetchingStatus} = this.state
    switch (fetchingStatus) {
      case fetchingStatusList.success:
        return this.renderProductsList()
      case fetchingStatusList.failed:
        return this.renderFailureView()
      case fetchingStatusList.inprogress:
        return this.renderLoader()
      default:
    }
    return this.renderLoader()
  }

  render() {
    const {activeCategory} = this.state

    return (
      <div className="all-products-section">
        <FiltersGroup
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          onCategoryChange={this.onCategoryChange}
          activeCategory={activeCategory}
          onRatingChange={this.onRatingChange}
          onChangeSearchInput={this.onChangeSearchInput}
          resetFilters={this.resetFilters}
        />

        {this.renderContent()}
      </div>
    )
  }
}

export default AllProductsSection
