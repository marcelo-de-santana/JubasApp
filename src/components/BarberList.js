import React from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function BarberList({ data }) {
  const timeResponse = (id, name, time) => {
    alert(`Você está sendo redirecionado para a página de confirmação. Deseja marcar um atendimento com ${name} às ${new Date(time).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}?
 Lembre-se que o tempo de tolerância é de 10 minutos, não se atrase!`);
  };

  if (data?.length > 0) {
    return (
      <ScrollView>
        {data.map((item) => (
          <View key={item.id} style={styles.boxHeader}>
            <Text style={styles.textHeader}>{item.name}</Text>
            <View style={styles.timesBox}>
              {item.available_times.map((aTimes) => {
                const isTimeUnavailable = item.unavailable_times.includes(aTimes);
                const textStyle = isTimeUnavailable ? styles.textUnATimes : styles.textATimes;
                const key = isTimeUnavailable ? aTimes : `${item.id}-${aTimes}`;
                return (
                  <TouchableOpacity
                    key={key}
                    onPress={() => timeResponse(item.id, item.name, aTimes)}
                    disabled={isTimeUnavailable}
                  >
                    <Text style={textStyle}>{new Date(aTimes).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}
        <View style={{alignItems:'center'}}>
          <TouchableOpacity style={styles.button} onPress={() => alert('Botão não definido')}>
            <Text style={styles.textButton}>Agendar Horário</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={styles.unavailableContainer}>
      <Text style={styles.unavailableText}>Agenda Indisponível</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  boxHeader: {
    marginTop: 5,
    paddingBottom: 10,
  },
  textHeader: {
    color: "#000000",
    fontSize: 14,
    paddingLeft: 15,
    paddingBottom: 4,
  },
  timesBox: {
    backgroundColor: "#9ba7bf",
    borderRadius: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 10,
    padding: 12,
  },
  textATimes: {
    color: "white",
    fontSize: 20,
    paddingHorizontal: 4,
  },
  textUnATimes: {
    color: "red",
    fontSize: 20,
    paddingHorizontal: 4,
  },
  unavailableContainer: {
    alignItems: "center",
    height: "70%",
    justifyContent: "center",
  },
  unavailableText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
  button: {
    backgroundColor: "#3c4659",
    borderRadius: 6,
    height: 40,
    justifyContent: "center",
    marginTop: 20,
    width: "80%",
  },
  textButton: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 18
  },
});