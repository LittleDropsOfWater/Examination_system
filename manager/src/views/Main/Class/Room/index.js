import {useEffect} from "react"
import { connect } from "dva"

function Room(props){
  useEffect(()=>{

  },[])
    return (<div>教室管理</div>)
}
const MapState=state=>{
    return state.class
}
const MapDispatch=dispatch=>({
    
})
export default connect(MapState,MapDispatch)(Room)