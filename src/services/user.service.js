import axios from "axios";

const getUser = (user) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
  axios.defaults.baseURL = process.env.REACT_APP_API_ADRESS;
  axios
    .get(process.env.REACT_APP_API_ADRESS + "/api/users/" + user.userId)

    .then((response) => {
      const image = response.data.user.imageUrl.replace("https://localhost:3000", process.env.REACT_APP_API_ADRESS);
      this.setState({ image });
      const isAdmin = response.data.user.isAdmin;
      this.setState({ isAdmin });
    //   console.log({image, isAdmin});
      console.log("coucou");
    })

    .catch((response) => Error);
};


const exportedObject = {
  getUser,
};

export default exportedObject;
