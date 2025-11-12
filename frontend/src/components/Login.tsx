import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

interface DecodedToken {
  id: string;
  role: string;
  exp: number;
}

const Login = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded: DecodedToken = jwtDecode(token);
      if (decoded.exp * 1000 > Date.now()) {
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem("token");
      }
    } catch {
      localStorage.removeItem("token");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="hidden md:flex items-center space-x-3">
      {!isLoggedIn ? (
        <Button
          variant="ghost"
          className="font-medium"
          onClick={() => navigate("/login")}
        >
          Sign In
        </Button>
      ) : (
        <>
          <button
            onClick={() => navigate("/profile")}
            className="p-2 rounded-full hover:bg-muted transition"
          >
            <User className="h-6 w-6 text-primary" />
          </button>
          <Button
            variant="ghost"
            className="font-medium"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </>
      )}
    </div>
  );
};

export default Login;
