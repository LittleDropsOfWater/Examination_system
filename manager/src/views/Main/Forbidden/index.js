import {useEffect} from 'react';
import particleSystem from '@/utils/particle'
import styles from './index.scss';
function Forbidden(props){
	useEffect(()=>{
		var system = new particleSystem({ canvas_id: 'container' });
		system.start();
	},[])
	return (
		<div className={styles.wrap}>
		<canvas id="container" className={styles.canvas} ></canvas>
		</div>
	)
}

export default Forbidden;