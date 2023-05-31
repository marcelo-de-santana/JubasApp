import { createStackNavigator } from '@react-navigation/stack';
import EmployeeProvider from '../contexts/employee';
import EmplyeesMainScreen from '../screens/Employees/EmplyeesMainScreen';
import ActiveEmployees from '../screens/Employees/Active/ActiveEmployees';
import EmployeeOverview from '../screens/Employees/EmployeeOverview';
import SpecialtiesEmployee from '../screens/Employees/Specialties/SpecialtiesEmployee';
import RegisterEmployee from '../screens/Employees/RegisterEmployee';
import AllEmployees from '../screens/Employees/All/AllEmployees';
import EmployeeTimeList from '../screens/Employees/Active/EmployeeTimeList';
import TimeEditForm from '../screens/Employees/Active/TimeEditForm';
import DaysEntryForm from '../screens/Employees/Active/DaysEntryForm';
import TimetableEntryForm from '../screens/Employees/Active/TimetableEntryForm';
import SpecialtiesList from '../screens/Specialties/SpecialtiesList'


const Stack = createStackNavigator();

export function EmployeesScreen() {
	return (
		<EmployeeProvider>
			<Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: "#3c4659" }, headerTintColor: '#fff' }}>
				<Stack.Screen name="EmployessMainScreen" component={EmplyeesMainScreen} options={{ headerShown: false }} />
				<Stack.Screen name="ActiveEmployees" component={ActiveEmployees} options={{ headerShown: false }} />
				<Stack.Screen name="EmployeeOverview" component={EmployeeOverview} options={{ headerShown: false }} />
				<Stack.Screen name="SpecialtiesEmployee" component={SpecialtiesEmployee} options={{ headerShown: false }} />
				<Stack.Screen name="AllEmployees" component={AllEmployees} options={{ headerShown: false }} />
				<Stack.Screen name="RegisterEmployee" component={RegisterEmployee} options={{ headerShown: false }} />
				<Stack.Screen name="EmployeeTimeList" component={EmployeeTimeList} options={{ headerShown: false }} />
				<Stack.Screen name="EmployeesTimeEditForm" component={TimeEditForm} options={{ headerShown: false }} />
				<Stack.Screen name="EmployeesDaysEntryForm" component={DaysEntryForm} options={{ headerShown: false }} />
				<Stack.Screen name="EmployeesTimetableEntryForm" component={TimetableEntryForm} options={{ headerShown: false }} />
				<Stack.Screen name="SpecialtiesList" component={SpecialtiesList} options={{ headerShown: false }} />
			</Stack.Navigator>
		</EmployeeProvider>
	);
}