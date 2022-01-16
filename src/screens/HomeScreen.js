import { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { listProducts } from '../actions/productActions'

import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'


const HomeScreen = () => {

  // const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const { error, loading, products, page, pages } = productList

  let keyword = location.search
  // console.log(keyword)
  useEffect(() => {

    dispatch(listProducts(keyword))

  }, [dispatch, keyword])

  return (
    <div>
      <h1>Latest Products</h1>
      {loading ? <Loader />
        : error ? <Message variant='danger' >{error}</Message> :
          <div>
            <Row>
              {
                products.map(product => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))
              }
            </Row>
            <Paginate keyword={keyword} page={page} pages={pages} isAdmin={false} />
          </div>
      }
    </div>
  )
}

export default HomeScreen
