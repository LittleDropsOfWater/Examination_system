import {  useEffect} from "react";
import {  connect} from "dva";
import { message } from 'antd';
const {success,error}=message;
function Message({code,msg}){
useEffect(()=>{
if(code===-1)return ;
if(code){
	success(msg)
}else{
	error(msg)
}
},[code]);

	return null;
}
const mapState=state=>state.message;
export default connect(mapState)(Message);