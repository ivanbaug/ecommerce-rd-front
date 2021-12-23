import { useEffect } from 'react'
import { Row, Col, Image, ListGroup, Button, Card } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import Rating from "../components/Rating"
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'


// import products from "../products"

const ProductScreen = () => {

  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { error, loading, product } = productDetails
  const params = useParams()
  // const product = products.find((p) => p._id === params.id)



  useEffect(() => {
    dispatch(listProductDetails(params.id))
  }, [dispatch, params])



  return (
    <div>
      <Link to='/' className="btn btn-light my-3">Go Back</Link>
      {loading ? <Loader />
        : error ? <Message variant='danger' >{error}</Message> :
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                </ListGroup.Item>
                <ListGroup.Item>
                  Price: ${product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price: </Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status: </Col>
                      <Col>
                        {product.countInStock >= 1 ? 'In Stock' : 'Out of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="d-grid gap-2">
                      <Button type="button" disabled={product.countInStock === 0} >
                        {product.countInStock >= 1 ? 'Add to cart' : 'Out of Stock'}
                      </Button>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

      }
    </div>
  )
}

export default ProductScreen
