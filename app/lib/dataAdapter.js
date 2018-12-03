import Api from "./api";
import { AsyncStorage, } from 'react-native';
import { ActionCreators } from "../aRedux";
class Adapter {
    get = (apiPath, model, filterParams, urlParams) => {
        return Api.get(apiPath, model, filterParams, urlParams)
    }
    login = (username,password) => {
        return this.get('Members/loginMember', null, null, { username: username, password: password })
    }
    getUserById = (userId) => {
        return ActionCreators.fetchById('members','cUser',userId);
    }

}
export const dataAdapter = new Adapter();