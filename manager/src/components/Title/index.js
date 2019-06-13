import React from 'react';
import styles from "./index.scss";

function Title(props){
	return (
		<h2 className={styles.mainTitle}>{props.children}</h2>
		
	)
}
export default Title;