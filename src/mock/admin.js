import {Users,Shops} from './data/admin'

export default {
  getUserListPage: config => {
    let {page, name} = JSON.parse(config.body);
    let mockUsers = Users.filter(user => {
      if (name && user.name.indexOf(name) === -1) return false;
      return true;
    });
    let total = mockUsers.length;
    mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
    return{
      total: total,
      datas: mockUsers
    }
  },
  getShopListPage: config => {
    let {page, name} = JSON.parse(config.body);
    let mockShops = Shops.filter(shop => {
      if (name && shop.brandName.indexOf(name) === -1) return false;
      return true;
    });
    let total = mockShops.length;
    mockShops = mockShops.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
    return{
      total: total,
      datas: mockShops
    }
  },




  returnTrue:config => {
    return true
  },
}
