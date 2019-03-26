import { param2Obj } from '@/utils'
import {userMap} from "./data/user";


export default {
  loginByUsername: config => {
    const { username } = JSON.parse(config.body)
    return userMap[username]
  },
  getUserInfo: config => {
    const { token } = param2Obj(config.url)
    if (userMap[token]) {
      return userMap[token]
    } else {
      return false
    }
  },
  register: config => {
    const { username } = JSON.parse(config.body)
    return userMap[username]
  },
  checkedUser:config=>{
    const { username } = JSON.parse(config.body)
    return 'success';
  },
  logout: () => 'success'
}
