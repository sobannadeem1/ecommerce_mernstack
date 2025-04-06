"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/reducers/userreducer";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import { fetchproducts } from "@/reducers/productreducer";

function Header() {
  const router = useRouter();
  const dispatch = useDispatch();

  const products =
    useSelector((state) => state.product?.products.products) || [];
  const cartshow = useSelector((state) => state.cart.cart);
  const token = useSelector((state) => state.user.token);
  const loginuser = useSelector((state) => state.user?.user?.user);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchproducts());
  }, [dispatch]);

  useEffect(() => {
    console.log("products:", products);
    if (Array.isArray(products)) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [products, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search Query: ", searchQuery);
  };
  useEffect(() => {
    console.log("Filtered Products: ", filteredProducts);
  }, [filteredProducts]);
  const handlelogout = () => {
    dispatch(logout());
    router.push("/login");
  };
  return (
    <>
      <Navbar expand="lg" className="bg-light shadow-sm">
        <Container>
          <Navbar.Brand href="/" className="fw-bold fs-4">
            Ecommerce Store
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto">
              <Nav.Link href="/showproducts" className="fs-5">
                Home
              </Nav.Link>
              <Nav.Link href="/about" className="fs-5">
                About
              </Nav.Link>
            </Nav>

            <div className="d-flex align-items-center">
              <Form className="d-flex me-3" onSubmit={handleSearch}>
                <Form.Control
                  type="search"
                  placeholder="Search Products"
                  aria-label="Search"
                  className="me-2"
                  style={{ minWidth: "200px" }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant="outline-success" type="submit">
                  Search
                </Button>
              </Form>

              <button
                className="btn position-relative me-3"
                onClick={() => router.push("/cart")}
                style={{ border: "none", background: "transparent" }}
              >
                <FaShoppingCart size={24} className="text-dark" />
                {cartshow.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartshow.length}
                  </span>
                )}
              </button>

              {token ? (
                <div className="d-flex align-items-center gap-3">
                  <Button variant="outline-danger" onClick={handlelogout}>
                    Logout
                  </Button>
                  <div className="d-flex align-items-center bg-light px-3 py-1 rounded-pill shadow-sm">
                    <i className="bi bi-person-circle me-2 text-primary"></i>
                    <span className="fw-semibold text-dark">
                      {loginuser?.username || "User"}
                    </span>
                  </div>
                </div>
              ) : (
                <>
                  <Link href="/login" passHref>
                    <Button variant="outline-primary" className="me-2">
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup" passHref>
                    <Button variant="primary">Signup</Button>
                  </Link>
                </>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {searchQuery && (
        <section className="py-5 bg-light">
          <div className="container">
            <h2 className="text-center mb-4 fw-bold">Search Results</h2>
            {filteredProducts.length === 0 ? (
              <p className="text-center text-muted">No products found</p>
            ) : (
              <div className="row row-cols-1 row-cols-md-3 g-4">
                {filteredProducts.map((product) => (
                  <div key={product._id} className="col">
                    <div className="card shadow-sm border-0 h-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="card-img-top"
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text text-muted">
                          {product.description}
                        </p>
                        <h6 className="fw-bold text-primary">
                          ${product.price}
                        </h6>
                      </div>
                      <div className="card-footer bg-white">
                        <button
                          className="btn btn-primary btn-sm me-2"
                          onClick={() =>
                            router.push(`/showproducts/${product._id}`)
                          }
                        >
                          Buy Now
                        </button>
                        <button className="btn btn-outline-secondary btn-sm">
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}

export default Header;
