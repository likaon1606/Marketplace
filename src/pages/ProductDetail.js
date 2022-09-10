import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getProductsThunk, startAddToCart } from '../redux/actions'
import '../styles/productDetail.css'

const ProductDetail = () => {

  const dispatch = useDispatch()

  const { id } = useParams()

  const [ recomendProducts, setRecomendProducts ] = useState([])
  const [ rate, setRate ] = useState(1);
  
  const products = useSelector(state => state.products)

  
  useEffect(() => dispatch(getProductsThunk()), [dispatch])

  const productsFound = products.find(productsItem => productsItem.id === Number(id))
    //console.log(products[0]?.id, id)
    //console.log(productsFound)
    //console.log(productsFound.category)

  useEffect(() => {
    if(productsFound){
      axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/?category=${productsFound?.category.id}`)
      .then(res => setRecomendProducts(res.data.data.products))
    }
    
  }, [dispatch, productsFound])

  //console.log(recomendProducts)
  const addCart = () =>{
    // console.log({
    //   products: id,
    // })
    const buyProducts = {
      id,
      "quantity": +rate
    }
    dispatch(startAddToCart(buyProducts))
  }


  console.log(rate)


  return (
    <section className="product-detatl">
      <div className="purchase">
        <div className="input-container">
           <label htmlFor="rate"></label>
          <input type="text" id="rate" value={rate} onChange={(e) => setRate(e.target.value)} required pattern='[1-9]{5}'/>
        </div>
        {/* <button ><i className="fa-solid fa-bookmark"></i></button> */}
      </div>
      
      

      <div className="return-home">
        <div className="link-home">
          <Link to="/">
            <h3>Home </h3>
          </Link>
          <div className="icon-circle">
            <i className="fa-solid fa-circle"></i>
          </div>
          <article key={productsFound?.id}>{productsFound?.title}</article>
        </div>
        <button>
          <i className="fa-solid fa-bookmark"></i>
        </button>
      </div>

      <div className="card-desc">
        <div className="product-desc">
          <div className="img-detail">
            <div className="card-img">
              <img src={productsFound?.productImgs[0]} alt="" width={160} />
            </div>

            <div className="seconds-imgs">
              <img src={productsFound?.productImgs[1]} alt="" width={120} />
              <img src={productsFound?.productImgs[2]} alt="" width={120} />
            </div>
          </div>
          <div className="desc-detail">
            <div className="desc-favotites">
              <h3>{productsFound?.title}</h3>
            </div>

            <p>{productsFound?.description}</p>
            <article>Price</article>
            <p className="price">$ {productsFound?.price}</p>
            <button onClick={addCart} onChange={e => dispatch(setRate(e.target.value))} value={products}>
              Add to cart <i className="fa-solid fa-cart-shopping"></i>
            </button>
          </div>
        </div>
      </div>

      <h4>Discover similar products</h4>

      <div className="recomend">
        <ul className="product-recomend">
          {recomendProducts.map((productItem) => (
            <div className="product" key={productItem.id}>
              <Link to={`/product/${productItem.id}`}>
                <div className="product-img">
                  <img src={productItem.productImgs[0]} alt="" width={190} />
                </div>
              </Link>
              <div>
                <h6>{productItem.title}</h6>
                <div className="purchase-card">
                  <div>
                    <article>Price</article>
                    <p>$ {productItem.price}</p>
                  </div>
                  <i className="fa-solid fa-cart-shopping"></i>
                </div>
              </div>
            </div>
          ))}
        </ul>
      </div>

     
    </section>
  );
}

export default ProductDetail