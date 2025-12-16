import React, { useContext, useState } from "react";
import logo from "../../assets/images/logo.svg";
import { AuthContext } from "../Context/Authcontext";
import { NavLink, useNavigate } from "react-router-dom";
import { Cartcontext } from "../Cartcontext/CartContext";
import { Menu, X, ShoppingCart } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const { cartdetails } = useContext(Cartcontext);
  const { token, settoken } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  function Logout() {
    localStorage.clear();
    settoken(null);
    navigate("/Login");
    setOpen(false);
  }

  const linkClass =
    "block px-3 py-2 text-lg text-slate-900 font-light hover:text-green-600";

  return (
    <nav className="bg-gray-100 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <img src={logo} className="w-36" alt="FreshCart" />

          {/* Right icons (mobile) */}
          <div className="flex items-center gap-4 lg:hidden">
            {token && (
              <NavLink to="/Cart" className="relative">
                <ShoppingCart />
                {cartdetails?.numOfCartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartdetails.numOfCartItems}
                  </span>
                )}
              </NavLink>
            )}

            <button onClick={() => setOpen(!open)}>
              {open ? <X /> : <Menu />}
            </button>
          </div>

          {/* Desktop menu */}
          {token && (
            <ul className="hidden lg:flex items-center gap-4">
              <NavLink to="/" className={linkClass}>Home</NavLink>
              <NavLink to="/Brands" className={linkClass}>Brands</NavLink>
              <NavLink to="/Categories" className={linkClass}>Categories</NavLink>
              <NavLink to="/Products" className={linkClass}>Products</NavLink>
              <NavLink to="/Cart" className={linkClass}>Cart</NavLink>
              <NavLink to="/WishList" className={linkClass}>Wishlist</NavLink>
            </ul>
          )}

          {/* Desktop right */}
          <ul className="hidden lg:flex items-center gap-4">
            {token ? (
              <>
                <NavLink to="/Cart" className="relative">
                  <ShoppingCart />
                  {cartdetails?.numOfCartItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {cartdetails.numOfCartItems}
                    </span>
                  )}
                </NavLink>

                <button onClick={Logout} className={linkClass}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/Login" className={linkClass}>Login</NavLink>
                <NavLink to="/Register" className={linkClass}>Register</NavLink>
              </>
            )}
          </ul>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden pb-4">
            <ul className="flex flex-col gap-2">
              {token ? (
                <>
                  <NavLink onClick={() => setOpen(false)} to="/" className={linkClass}>Home</NavLink>
                  <NavLink onClick={() => setOpen(false)} to="/Brands" className={linkClass}>Brands</NavLink>
                  <NavLink onClick={() => setOpen(false)} to="/Categories" className={linkClass}>Categories</NavLink>
                  <NavLink onClick={() => setOpen(false)} to="/Products" className={linkClass}>Products</NavLink>
                  <NavLink onClick={() => setOpen(false)} to="/Cart" className={linkClass}>Cart</NavLink>
                  <NavLink onClick={() => setOpen(false)} to="/WishList" className={linkClass}>Wishlist</NavLink>
                  <button onClick={Logout} className={linkClass}>Logout</button>
                </>
              ) : (
                <>
                  <NavLink to="/Login" className={linkClass}>Login</NavLink>
                  <NavLink to="/Register" className={linkClass}>Register</NavLink>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
