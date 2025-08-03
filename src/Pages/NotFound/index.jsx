import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./index.css"; 
const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="notfound-root">
      <div className="notfound-center">
        <h1 className="notfound-title">404</h1>
        <p className="notfound-desc">Soonly Updating Brother</p>
        <a href="/" className="notfound-link">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;