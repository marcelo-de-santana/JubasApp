import React from "react"
import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container:{
        flex:1,
        width: "100%",
        height: "100%",
        //backgroundColor:"#423e3c"
    },
    boxForm:{
        alignItems: "center",
    },
    label:{
        width:"80%",
        paddingTop:5
    },
    input:{
        borderRadius: 6,
        borderWidth: 1,
        height: 40,
        paddingLeft: 10,
        width: "80%",
    },
    phoneAlert:{
        width:"80%",
        fontSize:12,
    },
    button:{
        backgroundColor: "#5ea28b",
        borderRadius: 6,
        height:40,
        justifyContent:"center",
        marginTop:20,
        width:"80%",
    },
    textButton:{
        textAlign:"center",
        color: "#ffffff",
        fontSize: 18
    },
})

export default styles;