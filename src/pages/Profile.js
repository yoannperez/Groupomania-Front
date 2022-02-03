import { React} from "react";
import AuthService from "../services/auth.service";
import { useNavigate, Link } from "react-router-dom";
import UploadImg from "../components/Profil/UploadImg";
import DeleteProfile from "../components/Profil/DeleteProfile";

const Profile = ({ utilisateur, refreshState, setRefreshState}) => {
  let navigate = useNavigate();
  const user = AuthService.getCurrentUser();


  // ---------------    OBJECT RETURNED TO VIRTUAL DOM    ------------------
  if (!user) {
    // history.push("/");
    navigate("/")
    

    return null;
  } else {
    return (
      <div className="profil-container">
        <h1>Profile Settings</h1>
        <h2>{utilisateur.username}</h2>
        <p>{utilisateur.description}</p>
        <div className="update-container">
          <div className="top-part">
            <img src={utilisateur.imageUrl} alt="user profile avatar"></img>
            <UploadImg utilisateur={utilisateur} refreshState={refreshState} setRefreshState={setRefreshState}/>
            {!utilisateur.isAdmin && <DeleteProfile id={utilisateur.id} />}
          </div>
        </div>
        <li className="nav-item">
          {/* <button className="btn btn-primary btn-block" >CLOSE</button> */}
          {/* <img src={users.image} className="profilePicture" alt="avatar" /> Profil{" "} */}
          <Link to="/" className="btn btn-primary btn-block">
            x FERMER x
          </Link>
        </li>
      </div>
    );
  }
  // -----------    END OF: OBJECT SEND TO VIRTUAL DOM    ----------
};

export default Profile;
