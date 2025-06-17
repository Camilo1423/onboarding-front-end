import { useSession } from "@Hooks";
import { ThemeBasic } from "@Theme";
import { cn } from "@Utils";
import { Calendar, LogOut, Menu, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const session = useSelector((state) => state.session);
  const { logout } = useSession();

  const routes = [
    {
      href: "/tablero/administracion-de-colaboradores",
      label: "Administrar colaboradores",
      icon: <User className="mr-2 h-4 w-4" />,
    },
    {
      href: "/tablero/calendario",
      label: "Calendario",
      icon: <Calendar className="mr-2 h-4 w-4" />,
    },
  ];

  // Cerrar el menú de usuario al hacer clic fuera de él
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link
          to="/tablero/administracion-de-colaboradores"
          className="flex items-center gap-2"
        >
          <picture>
            <img
              src="https://www.bancodebogota.com/documents/38440/2713321/Banco+de+Bogota%CC%81.svg/ae6fe9a9-fdc2-c13a-7404-9d3b62424d7e?t=1658163297427"
              alt="Logo-onboarding-app"
              className="w-40"
            />
          </picture>
          <span className={cn("text-md font-bold", ThemeBasic.text)}>
            | OnBoardingApp
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:space-x-4 lg:space-x-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              to={route.href}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                location.pathname === route.href
                  ? `${ThemeBasic.backgroundPrimary} text-white`
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {route.icon}
              {route.label}
            </Link>
          ))}
        </nav>

        {/* User Profile */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full border border-gray-200 flex items-center justify-center">
                <span className="text-sm font-medium">
                  {session.user_name.trim().charAt(0)}
                </span>
              </div>
              <div className="flex flex-col items-start">
                <span className="hidden md:inline text-sm font-medium">
                  {session.user_name.trim()}
                </span>
                <span className="hidden md:inline text-xs text-gray-500">
                  {session.user_email}
                </span>
              </div>
            </div>
          </button>

          {/* User Dropdown Menu */}
          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium">
                  {session.user_name.trim()}
                </p>
                <p className="text-xs text-gray-500">{session.user_email}</p>
              </div>
              <button
                className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full"
                onClick={logout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden ml-2 p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-3 space-y-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                to={route.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  location.pathname === route.href
                    ? `${ThemeBasic.backgroundPrimary} text-white`
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {route.icon}
                {route.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
