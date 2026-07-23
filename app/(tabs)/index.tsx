import "@/global.css";
import SafeAreaView from "@/shared/components/ui/safe-area-view";
import { Link } from "expo-router";
import { Text } from "react-native";

const App = () => {
	return (
		<SafeAreaView className="flex-1 bg-background p-5">
			<Text className="text-xl font-bold text-success">
				Welcome to Nativewind!
			</Text>
			<Link href="/test" className="mt-4 rounded bg-primary text-white p-4">Go to Test Page</Link>
			<Link href="/(auth)/sign-in" className="mt-4 rounded bg-primary text-white p-4">Go to Sign In</Link>
			<Link href="/(auth)/sign-up" className="mt-4 rounded bg-primary text-white p-4">Go to Sign Up</Link>
			<Link href="/subscriptions/spotify" 
				// className="mt-4 rounded bg-primary text-white p-4"
			>
				Spotify Subscriptions
			</Link>
			<Link 
				href={{
				pathname: "/subscriptions/[id]",
				params: { id: "LeBorn" }
				}} 
				// className="mt-4 rounded bg-primary text-white p-4"
			>
				Claude Subscriptions
			</Link>
		</SafeAreaView>
	);
}

export default App