import {useEffect} from "react"
import { connect } from "dva"

function Student(props){
  useEffect(()=>{

  },[])
    return (<div>学生管理</div>)
}
const MapState=state=>{
    return state.class
}
const MapDispatch=dispatch=>({
    
})
export default connect(MapState,MapDispatch)(Student)