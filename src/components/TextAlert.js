import React from "react";
import {Text} from "react-native";

export default function TextAlert({error}){
    return(
        <Text style={{fontSize:12, width:'80%',textAlign:'left',color:'red'}}>
            {error}
        </Text>
)}