import { useState, useEffect } from 'react'
import { Row, Col, Image, ListGroup, Button, Card } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import Rating from "../components/Rating"
import axios from 'axios'


// import products from "../products"

const ProductScreen = () => {
  const params = useParams()
  // const product = products.find((p) => p._id === params.id)

  const [product, setProduct] = useState([])

  useEffect(() => {
    async function fetchProduct() {
      const { data } = await axios.get(`/api/product/${params.id}`)
      setProduct(data)
    }
    fetchProduct()
  }, [])



  return (
    <div>
      <Link to='/' className="btn btn-light my-3">Go Back</Link>
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
    </div>
  )
}

export default ProductScreen
