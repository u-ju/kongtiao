const basePath = 'https://501f875c.ngrok.io/api';
const apiList = {
  auth: basePath +'/wx/auth',
  airConditionerType: basePath + '/wxairConditionerType',
  findAdress: basePath + '/wx/v1/findAdress',
  addAddress: basePath + '/wx/v1/addAddress',
  updateAddress: basePath + '/wx/v1/updateAddress',
  delAddress: basePath + '/wx/v1/delAddress',
  updateUserFalg: basePath + '/wx/v1/updateUserFalg',
}
module.exports = apiList;
