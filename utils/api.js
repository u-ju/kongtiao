const basePath = 'http://cd159ddf.ngrok.io/api';
const apiList = {
  auth: basePath +'/wx/auth',
  airConditionerType: basePath + '/wx/v1/airConditionerType',
  findAdress: basePath + '/wx/v1/findAdress',
  addAddress: basePath + '/wx/v1/addAddress',
  updateAddress: basePath + '/wx/v1/updateAddress',
  delAddress: basePath + '/wx/v1/delAddress',
  updateUserFalg: basePath + '/wx/v1/updateUserFalg',
}
module.exports = apiList;
