import { useNavigate } from "react-router-dom";
import { logout as logoutUser } from "../../api/axios/authAxios";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser()
      .then(() => {
        navigate("/login");
      })
      .catch((err) => alert(err.message));
  };
  return <button onClick={handleLogout}>Logout</button>;
};

export default Home;
