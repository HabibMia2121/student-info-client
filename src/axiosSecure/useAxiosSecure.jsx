import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../authProviders/AuthProviders";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: "http://localhost:5000/",
    withCredentials: true
});

const useAxiosSecure = () => {
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
      axiosSecure.interceptors.response.use(
        (res) => {
          return res;
        },
        (error) => {
          if (error.response.status == 401 || error.response.status == 403) {
            logOut()
              .then(() => {
                navigate("/login");
              })
              .catch((error) => console.log(error));
          }
        }
      );
    }, [logOut, navigate]);
    
    return axiosSecure;
};

export default useAxiosSecure;