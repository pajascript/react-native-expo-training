import "@/global.css";
import SafeAreaView from "@/shared/components/ui/safe-area-view";
import { Link } from "expo-router";
import { Text } from "react-native";

const App = () => {
	return (
		<SafeAreaView className="flex-1 bg-background p-5">
			<Text className="text-5xl font-sans-extrabold">Home</Text>
			<Link href="/test" className="mt-4 font-sans-bold rounded bg-primary text-white p-4">Go to Test Page</Link>
			<Link href="/(auth)/sign-in" className="mt-4 font-sans-bold rounded bg-primary text-white p-4">Go to Sign In</Link>
			<Link href="/(auth)/sign-up" className="mt-4 font-sans-bold rounded bg-primary text-white p-4">Go to Sign Up</Link>
		</SafeAreaView>
	);
}

export default App