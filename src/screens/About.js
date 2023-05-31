import {Text} from "react-native";

import UnderConstruction from "./UnderConstruction";

function Teste(props){

console.log(props)
	return(
		<><Text style={{color:'#000'}}>
		{props.children}
		</Text></>
	);
}


export default function About() {

	return (
		<>
		<Teste />
		<UnderConstruction />

		</>
	)
}
