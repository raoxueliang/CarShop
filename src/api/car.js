import request from '@/utils/request'

export function checkCarId(data) {
  return request({
    url: '/cars/check',
    method: 'post',
    headers:{
      'Content-Type': 'application/json'
    },
    data:{
      carId:data
    }
  })
}

export function getCarInfo(productId) {
  return request({
    url: '/car/get',
    method: 'post',
    headers:{
      'Content-Type': 'application/json'
    },
    data:{
      pId:productId
    }
  })
}

export function search(query) {
  return request({
    url: '/product/search',
    method: 'post',
    headers:{
      'Content-Type': 'application/json'
    },
    data:{
      queryString:query
    }
  })
}

export function getHotSearch() {
  return request({
    url: '/cars/getHotSearch',
    method: 'get',
    headers:{
      'Content-Type': 'application/json'
    },
  })
}

export function searchByText(text) {
  return request({
    url: '/cars/searchByText',
    method: 'post',
    headers:{
      'Content-Type': 'application/json'
    },
    data:{
      queryString:text
    }
  })
}
