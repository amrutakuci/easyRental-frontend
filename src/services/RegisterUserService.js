import axios from "axios"
import  {USER_REST_API_URL} from '../App'
//const USER_REST_API_URL="http://localhost:8080"

class RegisterUserService{
    registerUser(payLoad){
        var response=axios.post(`${USER_REST_API_URL}`+"/registerUser",payLoad);
        console.log(response);
    }
}

export default new RegisterUserService();
