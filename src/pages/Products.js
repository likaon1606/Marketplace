import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { filterCategoryThunk, filterHeadLineThunk, getCategoriesThunk, getProductsThunk } from '../redux/actions'
import '../styles/products.css'


const Products = () => {


  // const navigate = useNavigate()


  const dispatch = useDispatch()
  
  const products = useSelector(state => state.products)
  const categories = useSelector(state => state.categories)

  const [ headLine, setHeadLine ] = useState('')

  useEffect(() => {
    dispatch(getProductsThunk())
    dispatch(getCategoriesThunk())
  }, [ dispatch ])

  //console.log(products)
  //console.log(categories)
  
  const searchProducts = (e) => {
    e.preventDefault()
    dispatch(filterHeadLineThunk(headLine))
  }

   //console.log(headLine)



  return (
    <div className='products-page'>
      
      <div className='categories'>
      
        <h4>Categories</h4>
      {
        categories.map(category => (
        
          <button
            key={categories.id}
            onClick={() => dispatch(filterCategoryThunk(category.id))}>
              {category.name}
          </button>
        ))
      }
      </div>

      {/* SEARCH BY LINEHEAD */}
      <div className='form'>

      <form onSubmit={searchProducts}>
        <input 
          type="text" 
          placeholder=' Search product' 
          value={headLine} 
          onChange={e => setHeadLine(e.target.value)}
        />
        <button><i className="fa-solid fa-magnifying-glass"></i></button>
      </form>

      <div className='product-list'>
        <div className='product-card'>
      {
         products.length === 0 ? (
          <p>Sorry, product not found</p>
        ) : (
          
          products.map(product => (
            <div className='product'>
              <Link to={`/product/${product.id}`}>
              <div className='product-img'>
                <img src={product.productImgs[0]} alt="" width={190}/>
              </div>
              </Link>
              <div>
                <h6 key={product.id}> 
                {product.title}
                </h6>
                <div className='purchase-card'>
                  <div>
                    <article>Price</article>
                    <p>$ {product.price}</p>  
                  </div>
                  <i className="fa-solid fa-cart-shopping"></i>
                </div>
                
              </div>
            </div>
        )      
              
          ))
      }
      </div>
      </div>
      </div>
    </div>
  )
}

export default Products