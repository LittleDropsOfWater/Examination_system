import { useEffect } from "react";
function UserShow(props){
    console.log(props)
    useEffect(()=>{
        props.history.push({
            pathname: '/show',//返回当前页面
     })
    })
    return (<div>空白页</div>)
}

export default UserShow