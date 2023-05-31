import { StyleSheet } from "react-native";

const global = StyleSheet.create({
    container: {
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
    greyBoxItems: {
        backgroundColor: "#CCCED9",
        borderRadius: 6,
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
        backgroundColor: '#ccced9',
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
        justifyContent: 'space-between'
    }
})

export { global };
