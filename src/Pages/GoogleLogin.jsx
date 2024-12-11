import { useContext } from "react";
import AuthContext from "../Contexts/AuthContext";

const GoogleLogin = () => {
  const { googleSignIn } = useContext(AuthContext);

  const handleGoogleLogin = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <button
        onClick={handleGoogleLogin}
        className="bg-teal-500 text-white px-4 py-2 rounded-md"
      >
        Google Login
      </button>
    </div>
  );
};

export default GoogleLogin;
