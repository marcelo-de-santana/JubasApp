import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import StackScreens from "./routes/Stack";
import AuthProvider from './contexts/auth';

export default function App() {
		return (
			<NavigationContainer>
					<AuthProvider>
						<StackScreens />
					</AuthProvider>
	
			</NavigationContainer>
		);
}
