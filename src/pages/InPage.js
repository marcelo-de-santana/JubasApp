import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Checkbox } from 'react-native-paper';
import Title from '../components/Title';



export default function InPage() {
  const [checkedItems, setCheckedItems] = useState([]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Title />


        <View style={styles.body}>


          <Text style={{ color: "#161c26" }}>Selecione um Tipo de Serviço</Text>
          <View>
            <Checkbox.Item
              status={checkedItems.includes('item1') ? 'checked' : 'unchecked'}
              label="Item 1"
              onPress={() => handleCheckbox('item1')}
            />
            <Checkbox.Item
              status={checkedItems.includes('item2') ? 'checked' : 'unchecked'}
              label="Item 2"
              onPress={() => handleCheckbox('item2')}
            />
            <Checkbox.Item
              status={checkedItems.includes('item3') ? 'checked' : 'unchecked'}
              label="Item 3"
              onPress={() => handleCheckbox('item3')}
            />
          </View>

          {/**Listagem de todos os Serviços disponíveis para o dia 
           * 
           * 
           * 
            
            *Cortes:

            Corte de cabelo masculino
            Corte de cabelo feminino
            Corte de cabelo infantil
            Corte de barba
            Aparar costeletas
            
            *Tratamentos capilares:

            Hidratação capilar
            Reconstrução capilar
            Cauterização capilar
            Coloração de cabelo
            Estética masculina:

            Depilação com cera ou máquina de barbear
            Limpeza facial
            Massagem facial e corporal
            Manicure e pedicure masculino
            
            *Produtos:

            Pomadas para cabelo
            Óleos para barba
            Shampoo para cabelo e barba
            
            *Serviços adicionais:

            Ambiente confortável e descontraído para os clientes
            Televisão e jogos para entretenimento
            Venda de bebidas
            Pacotes para eventos de casamento ou noivado.
           *
            *
            * Visualizar o biblioteca:
            * https://callstack.github.io/react-native-paper/docs/components/Checkbox/CheckboxAndroid
            * 
            * Lançar a biblioteca paper na Regra de negócios
            * 
            * 
            * 
            * 
          */}

          <Text style={{ color: "#161c26" }}>Estes são os barbeiros disponíveis</Text>

          <Text style={{ color: "#161c26" }}>Deseja confirmar o atendimento?</Text>



        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  body: {
    backgroundColor: 'red'
  }

})