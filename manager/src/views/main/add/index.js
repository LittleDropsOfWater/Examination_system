import React,{useEffect} from "react"
import { connect } from 'dva';
function Add(props){
    useEffect(()=>{
        
       props.addGetData()
    },[])
    return (
        <div>添加试卷</div>
    )
}
const MapState=state=>{
    return state
}
const MapDispatch=dispatch=>({
    addGetData(){
        dispatch({
            type:"main/addGetData",   
        })
    }
})
export default connect(MapState,MapDispatch)(Add)