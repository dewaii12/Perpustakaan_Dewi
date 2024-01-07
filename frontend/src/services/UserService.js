import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:9080/users";

class UserService {

    getInventory(){
        return axios.get(USER_API_BASE_URL);
    }

    createInventory(user){
        return axios.post(USER_API_BASE_URL, user);
    }

    getInventoryById(userId){
        return axios.get(USER_API_BASE_URL + '/' + userId);
    }

    updateInventory(user, userId){
        return axios.put(USER_API_BASE_URL + '/' + userId, user);
    }

    deleteInventory(userId){
        return axios.delete(USER_API_BASE_URL + '/' + userId);
    }

}

export default new UserService()