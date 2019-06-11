import React, { useState,useEffect } from "react";
import { connect } from "dva";
// class LoginPage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }
//   render() {
//     return null;
// 	}
// 	componentDidMount(){
// 		let {} = this.props;
// 	}
// }
function LoginPage ({login}){
	//创建副作用
	useEffect(()=>{
		login({
			user_name:'chenmanjie',
			user_pwd:'Chenmanjie123!'
		})
	},[])
	//无第二个参数,props改变函数就会被调用
	//空数组只会触发一次

	return null;
}
//props的类型检查
LoginPage.propTypes={

}
//props的默认值
LoginPage.defaultProps={

}
const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
	login(){
		dispatch({
			type:'user/login',
			payload:{}
		})
	}
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
