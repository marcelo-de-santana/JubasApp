import { StyleSheet } from "react-native";

const global = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: "#F2F2F2",
    },
    containerMiddle: {
        height: '50%'
    },
    boxHeader: {
        marginBottom: 10,
    },
    horizontalMargins: {
        paddingHorizontal: 30,
    },
    logo: {
        backgroundColor: "#CCCED9",
        borderRadius: 4,
        marginTop: 20,
        height: 150,
        width: 120,
    },
    boxMenu: {
        backgroundColor: '#9BA7BF',
        borderRadius: 6,
        height: 60,
        justifyContent: 'center',
        margin: 5,
        width: '45%'
    },
    textMenu: {
        color: 'white',
        textAlign: 'center'
    },
    textHeader: {
        color: "#000",
        fontSize: 16,
        paddingLeft: 5,
        paddingBottom: 4,
    },
    textHeaderMiddle: {
        color: "#000",
        fontSize: 18,
    },
    blueBox: {
        backgroundColor: "#9BA7BF",
        borderRadius: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 12,
    },
    blueBoxItems: {
        backgroundColor: "#9BA7BF",
        borderRadius: 6,
        marginVertical: 5,
        padding: 10,
    },
    greyBox: {
        backgroundColor: "#CCCED9",
        borderRadius: 6,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'space-between',
        marginVertical: 5,
        padding: 10,
    },
    greyBoxItems: {
        backgroundColor: "#CCCED9",
        borderRadius: 6,
        marginVertical: 5,
        padding: 10,
    },
    greyBoxItemsFlex: {
        backgroundColor: "#CCCED9",
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
        padding: 10,
    },
    switchBox: {
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    whiteTextLarge: {
        color: "white",
        fontSize: 20,
        paddingHorizontal: 4,
    },
    whiteTextMiddle: {
        color: "white",
        fontSize: 18,
    },
    whiteTextSmall: {
        color: "white",
        fontSize: 16,
    },
    whiteTextSmallVeryCenter: {
        color: "white",
        fontSize: 14,
        textAlign: 'center'
    },
    whiteTextSmallCenter: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
    blackTextSmall: {
        color: "#000",
        fontSize: 16,
    },
    blackTextMiddle: {
        color: "#000",
        fontSize: 18,
    },
    blackTextSmallCenter: {
        color: "#000",
        fontSize: 16,
        textAlign: 'center'
    },
    blackTextLarge: {
        color: "#000",
        fontSize: 20,
    },
    blackTextLargeCenter: {
        color: "#000",
        fontSize: 20,
        textAlign: 'center'
    },
    darkBlueTextSmall: {
        color: "#161c26",
        fontSize: 14,
    },
    darkBlueTextSmallCenter: {
        color: "#161c26",
        fontSize: 14,
        textAlign: 'center',
    },
    redText: {
        color: "red",
        fontSize: 20,
        paddingHorizontal: 4,
    },
    label: {
        color: '#161c26',
        paddingTop: 5
    },
    input: {
        backgroundColor: '#CCCED9',
        borderRadius: 6,
        borderWidth: 1,
        color: '#000000',
        height: 40,
        paddingLeft: 10,
    },
    footerBox: {
        paddingBottom: 10,
    },
    scrollInfo: {
        textAlign: 'center',
        color: '#3c4659',
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#3c4659",
        borderRadius: 6,
        height: 40,
        justifyContent: "center",
        marginTop: 5
    },
    inactiveButton: {
        backgroundColor: "#CCCED9",
        borderRadius: 6,
        marginVertical: 5,
        padding: 10,
        width: "30%",
    },
    activeButton: {
        backgroundColor: "#3C4659",
        borderRadius: 6,
        marginVertical: 5,
        padding: 10,
        width: "30%",
    },
    textButton: {
        textAlign: 'center',
        color: "#fff",
        fontSize: 18
    },
    cart: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between'
    },
    boxFlexRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    boxFlexRowSwitch: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingVertical:10
    },
    boxFooter: {
        height: 230,
        marginVertical: 20
    },
    footerBottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    }
})

const modal = StyleSheet.create({
    container: {
        flex: 1,
    },
    pressable: {
        flex: 1,
        backgroundColor: 'black',
        opacity: 0.9
    },
    boxItems: {
        backgroundColor: 'black',
        paddingHorizontal: 10,
        paddingTop: 20,
        paddingBottom: 8,
        opacity: 0.9
    },
    boxForm: {
        backgroundColor: '#CCCED9',
        borderRadius: 6,
        padding: 10,
        marginBottom: 10,
    },
    input: {
        backgroundColor: '#F2F2F2',
        borderRadius: 6,
        borderWidth: 1,
        color: '#161C26',
        height: 40,
        paddingLeft: 10,
    },
    button: {
        backgroundColor: "#3C4659",
        borderRadius: 6,
        height: 40,
        justifyContent: "center",
        marginTop: 5
    },
    whiteButton: {
        backgroundColor: "#FFF",
        borderRadius: 6,
        height: 40,
        justifyContent: "center",
        marginTop: 5
    },
    redButton: {
        backgroundColor: "red",
        borderRadius: 6,
        height: 40,
        justifyContent: "center",
        marginTop: 5
    },
    textButton: {
        textAlign: 'center',
        color: "#FFF",
        fontSize: 18
    },
    blackTextButton: {
        color: "#000",
        fontSize: 18,
        textAlign: 'center'
    },
    textHeader: {
        color: "#000",
        fontSize: 16,
        paddingLeft: 5,
        paddingVertical: 4,
    },
    switchBox: {
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: 'space-between',
        marginVertical: 5,
    },
});

const placeHolderColorTextInput = "#161c2660"

export { global, modal, placeHolderColorTextInput };
