import Cookie from "js-cookie";
const key = "Authorization";
//获取token
export const getToken = () => Cookie.get(key);

//设置token
export const setToken = value => Cookie.set(key, value, { expires: 7 });

const UserData = "UserData";
//获取UserData 
export const getUserData = () => Cookie.get(UserData);

//设置UserData
export const setUserData = value => Cookie.set(UserData, value, { expires: 7 });
