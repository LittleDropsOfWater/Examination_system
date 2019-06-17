import Cookie from "js-cookie";
const key = "Authorization";
//获取token
export const getToken = () => Cookie.get(key);

//设置token
export const setToken = value => Cookie.set(key, value, { expires: 7 });

//删除token
export const removeToken = () => Cookie.remove(key);

const UserData = "UserData";
//获取UserData 
export const getUserData = () => {
	const data=Cookie.get(UserData);
	return data?JSON.parse(data):'';
};

//设置UserData
export const setUserData = value => Cookie.set(UserData, value, { expires: 7 });

//删除UserData
export const removeUserData=()=>Cookie.remove(UserData);

const exam='exam';
//设置exam
export const setExam = value => localStorage.setItem(exam,JSON.stringify(value));

//删除Exam
export const getExam=()=>localStorage.getItem(exam)?JSON.parse(localStorage.getItem(exam)):null;