import { createStackNavigator } from '@react-navigation/stack';
import EmployeeProvider from '../contexts/employee';
import EmployeesMainScreen from '../screens/Employees/MainScreen';
import EmployeeOverview from '../screens/Employees/Overview';
import EmployeeSpecialties from '../screens/Employees/Specialties';
import EmployeeTimetable from '../screens/Employees/Timetable';
import TimeEditForm from '../screens/Employees/Active/TimeEditForm';
import DaysEntryForm from '../screens/Employees/Active/DaysEntryForm';
import TimetableEntryForm from '../screens/Employees/Active/TimetableEntryForm';
import SpecialtiesList from '../screens/Employees/SpecialtiesList'


const Stack = createStackNavigator();

export default function EmployeesScreen() {
	return (
		<EmployeeProvider>
			<Stack.Navigator screenOptions={{ headerTitle:'Gerenciar barbeiros', headerStyle: { backgroundColor: "#3c4659" }, headerTintColor: '#fff' }}>
				<Stack.Screen name="EmployessMainScreen" component={EmployeesMainScreen} />
				<Stack.Screen name="EmployeeOverview" component={EmployeeOverview} />
				<Stack.Screen name="EmployeeTimetable" component={EmployeeTimetable} />
				<Stack.Screen name="EmployeeSpecialties" component={EmployeeSpecialties} />
				<Stack.Screen name="SpecialtiesList" component={SpecialtiesList} />


				<Stack.Screen name="EmployeesTimeEditForm" component={TimeEditForm} />
				<Stack.Screen name="EmployeesDaysEntryForm" component={DaysEntryForm} />
				<Stack.Screen name="EmployeesTimetableEntryForm" component={TimetableEntryForm} />
			</Stack.Navigator>
		</EmployeeProvider>
	);
}