import React from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: "100%",
        height: "auto",
        //backgroundColor:"#423e3c",
        
    },
    header:{
        alignItems: "center",
        marginTop: 80,
        marginBottom: 20,
    },
    headerText:{
        fontSize: 20,
        marginBottom: 20,
    },
    logo:{
        width:100,
        height:150,
    },
    body:{
        height:220,
    },
    inputBox:{
        alignItems:"center",
        height: 85,
    },
    label:{
        fontSize:14,
        marginBottom: 3,
        width: "80%",
    },
    input: {
        width:"80%",
        height: 40,
        borderWidth: 0.8,
        borderRadius: 6,
        padding: 10,
    },
    errorMsg:{
        fontSize:12,
        color:'red',
        paddingTop: 10,
        textAlign:"center",
        width:"80%"
    },
    button:{
        backgroundColor:"#5EA28B",
        borderRadius:6,
        height:40,
        justifyContent:"center",
        marginTop:15,
        width:"80%",
    },
    buttonText:{
        color:"#ffffff",
        fontSize:18,
        textAlign:"center",        
    },
    footer:{
        height: 230,
    },
    buttonPassword:{
        alignItems:"center",
        marginBottom:15,
    },
    buttonRegister:{
        textAlign:"center",
    },
    
})

export default styles;