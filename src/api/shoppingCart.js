import request from '@/utils/request'

export function getCartInfo(uId) {
  return request({
    url: '/shoppingCart/getCartInfo',
    method: 'post',
    headers:{
      'Content-Type': 'application/json'
    },
    data:{
      id:uId
    }
  })
}

export function removeCart(data) {
  return request({
    url: '/shoppingCart/removeCart',
    method: 'post',
    headers:{
      'Content-Type': 'application/json'
    },
    data:data
  })
}

export function addCart(id,carId,amount) {
  return request({
    url: '/shoppingCart/addCart',
    method: 'post',
    headers:{
      'Content-Type': 'application/json'
    },
    data:{
      id:id,
      carId:carId,
      amount:amount
    }
  })
}
