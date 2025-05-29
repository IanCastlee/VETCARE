import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const RedirectByRole = () => {
  const { currUserType, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      currUserType === null ||
      currUserType === undefined ||
      currentUser === null ||
      currentUser === undefined
    )
      return;

    if (currUserType === 1) {
      navigate(`/veterinarian/home/${currentUser?.user_id}`);
    } else if (currUserType === 2) {
      navigate("/admin/home/");
    } else {
      navigate("/");
    }
  }, [currUserType, currentUser]);

  return null;
};

export default RedirectByRole;
