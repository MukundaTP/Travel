import { Button } from "flowbite-react";

const AuthButtons = ({ handleAuthClick }) => (
  <div className="flex items-center gap-4">
    <Button
      variant="ghost"
      className="text-gray-700 hover:text-white hover:bg-gray-700 transform transition-all duration-150"
      onClick={() => handleAuthClick("Login")}
    >
      Login
    </Button>
    <Button
      className="bg-gray-800 hover:bg-gray-700 text-white active:scale-90"
      onClick={() => handleAuthClick("Register")}
    >
      Register
    </Button>
  </div>
);

export default AuthButtons;
