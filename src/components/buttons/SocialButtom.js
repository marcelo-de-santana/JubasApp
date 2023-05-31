import React from "react"
import { StyleSheet,Text,View } from "react-native"

export default function SocialButtom(){
    <View style={styles.socialBox}>
        <Text style={styles.socialText}>Defina abaixo pelo menos uma forma na qual gostaria de receber alertas sobre o conteúdo da nossa loja:</Text>
        <Text>E-mail e SMS</Text>
        <Text>WhatsApp</Text>
    </View>
}

const styles = StyleSheet.create({
    socialBox:{
        marginHorizontal:"10%",
        marginVertical: 15,
        width:"80%"
    },
    socialText:{
        paddingBottom: 5,
        textAlign: "justify",
    },
})