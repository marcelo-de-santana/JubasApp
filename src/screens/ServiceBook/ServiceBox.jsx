import { useState } from 'react';
import { useService } from '../../contexts/service';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { global } from '../../components/styles/global';

export default function ServiceBox(props) {
	const [dataIndex, setDataIndex] = useState(props.route.params.categoryIndex);
	const {
		serviceData,
		setShoppingCart,
		switchState, setSwitchState
	} = useService();

	function handlePagination() {
		setShoppingCart(Object.keys(switchState).filter(key => switchState[key].statusButton))
		props.navigation.pop()
	}

	return (
		<View style={global.container}>
			<Text style={global.textHeader}>
				{serviceData[dataIndex]['category_name']}
			</Text>
			<ScrollView style={{ height: '90%' }}>
				<View style={global.blueBoxItems}>

					{serviceData[dataIndex]['services'].map((item, index) => (
						<View style={global.switchBox} key={index}>
							<Text key={index} style={global.whiteTextSmall}>{item.service_name}</Text>
							<Switch
								value={switchState[item.service_id]?.statusButton}
								onChange={() => {
									setSwitchState((prevState) => (
										{
											[item.service_id]: {
												"statusButton": !switchState[item.service_id]?.statusButton,
												"serviceId": item.service_id,
												"serviceName": item.service_name
											}
										}
									))
								}}
								disabled={false}
							/>
						</View>
					))}

				</View>
			</ScrollView>
			<TouchableOpacity style={global.button} onPress={() => handlePagination()}>
				<Text style={global.textButton}>Confirmar</Text>
			</TouchableOpacity>
		</View>
	);
}
