import { Link } from "react-router";
import { Header } from "../../components/Header/Header.jsx"
import "./NotFound.css";

export function NotFoundPage() {
  return (
    <>
      <Header />
      <section className="not-found">
        <div className="not-found__content">
          <h1 className="main-text">404</h1>
          <p className="sub-text">
            Looks like this page is out of stock <br />
            Let's get you back to the good stuff
          </p>
          <Link className="button-primary go-to-home-btn" to="/">Go home</Link>
        </div>
      </section>
    </>
  )
}  
