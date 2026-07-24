import "@/global.css";
import ListHeading from "@/shared/components/list-heading";
import SubscriptionCard from "@/shared/components/subscription-card";
import SafeAreaView from "@/shared/components/ui/safe-area-view";
import UpcomingSubscriptionCard from "@/shared/components/upcoming-subscription-card";
import { HOME_BALANCE, HOME_SUBSCRIPTIONS, HOME_USER, UPCOMING_SUBSCRIPTIONS } from "@/shared/constants/data";
import { icons } from "@/shared/constants/icons";
import images from "@/shared/constants/images";
import { formatCurrency } from "@/shared/utils/helpers/currency-formatter";
import dayjs from "dayjs";
import { useState } from "react";
import { FlatList, Image, Text, View } from "react-native";

const App = () => {
	const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<string | null>(null);

	return (
		<SafeAreaView className="flex-1 bg-background p-5">
			<FlatList 
				ListHeaderComponent={() => (
					<>
						<View className="home-header">
							<View className="home-user">
								<Image source={images.avatar} className="home-avatar" />
								<Text className="home-user-name">{HOME_USER.name}</Text>
							</View>

							<View className="p-2.5 rounded-full border border-border items-center justify-center bg-card">
								<Image source={icons.add} className="home-add-icon" />
							</View>
						</View>

						<View className="home-balance-card">
							<Text className="home-balance-label">Balance</Text>
							<View className="home-balance-row">
								<Text className="home-balance-amount">{formatCurrency(HOME_BALANCE.amount, "PHP")}</Text>
								<Text className="home-balance-date">{dayjs(HOME_BALANCE.nextRenewalDate).format("MM/DD")}</Text>
							</View>
						</View>

						<View className="mb-5">
							<ListHeading title="Upcoming" />
							<FlatList 
								data={UPCOMING_SUBSCRIPTIONS}
								renderItem={({ item }) => <UpcomingSubscriptionCard {...item} />}
								keyExtractor={(item) => item.id}
								horizontal
								showsHorizontalScrollIndicator={false}
								ListEmptyComponent={<Text>No upcoming renewalsyet</Text>}
							/>
						</View>

						<ListHeading title="All Subscriptions" />
					</>
				)}
				data={HOME_SUBSCRIPTIONS}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<SubscriptionCard 
						{...item}
						expanded={expandedSubscriptionId === item.id}
						onPress={() => setExpandedSubscriptionId(currentId => (
							currentId === item.id ? null : item.id
						))}
					/>
				)}
				extraData={expandedSubscriptionId}
				ItemSeparatorComponent={() => <View className="h-4" />}
				showsVerticalScrollIndicator={false}
				ListEmptyComponent={<Text className="home-empty-state">No subscriptions yet</Text>}
				contentContainerClassName="pb-26"
			/>
		</SafeAreaView>
	);
}

export default App