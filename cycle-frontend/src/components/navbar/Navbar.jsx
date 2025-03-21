import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiLogOut, FiShoppingCart } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../context/CartContext";
import { LuBaggageClaim } from "react-icons/lu";
import LanguageSwitcher from "../LanguageSwitcher";
import { useTranslation } from "react-i18next";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { userName, userEmail, logout } = useAuth();
  const { cart } = useCart();
  const { t } = useTranslation();
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Add this useEffect to handle auth state changes
  useEffect(() => {
    const handleAuthChange = () => {
      setShowDropdown(false);
    };
    handleAuthChange();
  }, [location, userName]);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#28544B] text-white flex justify-between items-center p-4 shadow-md z-50">
      {/* Logo */}
      <Link to="/">
        <h3 className="font-bold text-2xl">
          {t('cycle')}
          <span className="text-[#FFC107]">{t('PricingEngine')}</span>
        </h3>
      </Link>

      {/* Menu Button for small screens */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-white text-2xl focus:outline-none"
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Navigation Links - Hidden on small screens, visible on md+ */}
      <span className="hidden md:flex items-center">
        <Link
          to="/"
          className="px-4 text-lg p-1 text-[#dbe2e2] hover:bg-[#FF6B35] transition-colors duration-300 rounded"
        >
          {t('home')}
        </Link>
        <Link
          to="/calculateForm"
          className="px-4 text-lg p-1 text-[#dbe2e2] hover:bg-[#FF6B35] transition-colors duration-300 rounded"
        >
          {t('calculatePrice')}
        </Link>
        <Link
          to="/estimates"
          className="px-4 text-lg p-1 text-[#dbe2e2] hover:bg-[#FF6B35] transition-colors duration-300 rounded"
        >
          {t('estimatedPrice')}
        </Link>
        <Link
          to="/compare"
          className="px-4 text-lg p-1 text-[#dbe2e2] hover:bg-[#FF6B35] transition-colors duration-300 rounded"
        >
          {t('cyclesComparison')}
        </Link>
      </span>

      {/* Right side items */}
      <div className="flex items-center gap-4">
        {/* Language Switcher */}
        <div className="border-r border-[#3a6960] pr-4">
          <LanguageSwitcher />
        </div>
        
        {cartItemCount > 0 && (
          <Link
            to="/cart"
            className="px-4 text-lg p-1 text-[#dbe2e2] hover:bg-[#776862] transition-colors duration-300 rounded flex items-center relative"
          >
            <FiShoppingCart className="text-2xl" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          </Link>
        )}

        {/* User Section with Dropdown */}
        <div className="relative" ref={dropdownRef}>
          {userName ? (
            <>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 text-[#dbe2e2] hover:bg-[#bb9587] transition-colors duration-300 rounded-full relative group"
              >
                <CgProfile className="text-3xl" />
                {/* Tooltip */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-gray-800 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap transition-opacity duration-200 pointer-events-none ${
                    showDropdown
                      ? "opacity-0"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {userName}
                  {/* Triangle */}
                  <div className="absolute left-1/2 -translate-x-1/2 -top-1 border-4 border-transparent border-b-gray-800"></div>
                </div>
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-200 text-center">
                    <p className="text-lg font-semibold text-gray-900">
                      {userName}
                    </p>
                    <p className="text-sm text-gray-600">{userEmail}</p>
                  </div>
                  <Link
                    to="/orders"
                    onClick={() => setShowDropdown(false)}
                    className="w-full text-center px-4 py-2 text-[#374151] hover:bg-[#9c7b7f] flex items-center justify-center gap-2 border-b border-gray-200"
                  >
                    <LuBaggageClaim />
                    {t('orders')}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-center px-4 py-2 text-[#374151] hover:bg-[#9c7b7f] flex items-center justify-center gap-2"
                  >
                    <FiLogOut />
                    {t('logout')}
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link
              to="/signIn"
              className="px-4 text-lg p-1 bg-[#0f2e64] hover:bg-[#0f2e64] transition-colors duration-300 rounded"
            >
              {t('login')}
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu - Shown when isOpen is true */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#4f46e5] p-4 flex flex-col items-center md:hidden">
         
          <Link
            to="/"
            className="w-full text-center py-2 hover:bg-[#0f2e64] transition-colors duration-300 rounded"
            onClick={() => setIsOpen(false)}
          >
            {t('home')}
          </Link>
          <Link
            to="/calculateForm"
            className="w-full text-center py-2 hover:bg-[#0f2e64] transition-colors duration-300 rounded"
            onClick={() => setIsOpen(false)}
          >
            {t('calculatePrice')}
          </Link>
          <Link
            to="/estimates"
            className="w-full text-center py-2 hover:bg-[#0f2e64] transition-colors duration-300 rounded"
            onClick={() => setIsOpen(false)}
          >
            {t('estimatedPrice')}
          </Link>
          <Link
            to="/compare"
            className="w-full text-center py-2 hover:bg-[#0f2e64] transition-colors duration-300 rounded"
            onClick={() => setIsOpen(false)}
          >
            {t('cyclesComparison')}
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
