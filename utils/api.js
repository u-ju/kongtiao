const basePath = 'http://3fb3d02c.ngrok.io/api';
const apiList = {
  auth: basePath +'/wx/auth',
  airConditionerType: basePath + '/wx/v1/airConditionerType',
  findAdress: basePath + '/wx/v1/findAdress',
  addAddress: basePath + '/wx/v1/addAddress',
  updateAddress: basePath + '/wx/v1/updateAddress',
  delAddress: basePath + '/wx/v1/delAddress',
  updateUserFalg: basePath + '/wx/v1/updateUserFalg',
  getOrder: basePath + '/wx/v1/getOrder',
  getOrderDetails: basePath + '/wx/v1/getOrderDetails',
}
module.exports = apiList;
