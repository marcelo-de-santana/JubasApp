import { Text } from 'react-native';
import PriceList from './PriceList';

export default function Appointment() {

  return (
    <>
      <Text style={{ fontSize: 20, color: '#000000', textAlign:'center' }}>
        Selecione os serviços
      </Text>

      <PriceList />
    </>
  )
}