import { tabs } from "@/shared/constants/data"
import { colors, components } from "@/shared/constants/theme"
import { Tabs } from "expo-router"
import { Image, Platform, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const tabBar = components.tabBar

const TabLayout = () => {
    const insets = useSafeAreaInsets();

    const TabIcon = ({ focused, icon } : TabIconProps) => (
        <View className="tabs-icon">
            <View
                style={{
                    width: 48,
                    height: 48,
                    borderRadius: 999,
                    backgroundColor: focused ? colors.accent : "transparent",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Image source={icon} style={{ width: 24, height: 24 }} />
            </View>
        </View>
    )
    const isWeb = Platform.OS === 'web';

    return (
        <Tabs 
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: { 
                    position: 'absolute', 
                    bottom: Math.max(insets.bottom, tabBar.horizontalInset),
                    height: tabBar.height,
                    marginHorizontal: tabBar.horizontalInset,
                    borderRadius: tabBar.radius,
                    backgroundColor: colors.primary,
                    borderTopWidth: 0,
                    elevation: 0,
                    paddingHorizontal: isWeb ? 12 : 0,
                },
                tabBarItemStyle: {
                    paddingVertical: isWeb ? 0 : tabBar.height / 2 - tabBar.iconFrame / 1.6,
                },
                tabBarIconStyle: {
                    width: tabBar.iconFrame,
                    height: tabBar.iconFrame,
                    alignItems: 'center',
                    justifyContent: 'center',
                },
            }}
        >
            {tabs.map(tab => (
                <Tabs.Screen 
                    key={tab.name} 
                    name={tab.name} 
                    options={{
                        title: tab.title, 
                        tabBarIcon: ({ focused }) => (
                            <TabIcon focused={focused} icon={tab.icon} />
                        )
                    }} 
                />
            ))}
            {/* <Tabs.Screen name="index" options={{ title: "Home" }} />
            <Tabs.Screen name="subscriptions" options={{ title: "Subscriptions" }} />
            <Tabs.Screen name="insights" options={{ title: "Insights" }} />
            <Tabs.Screen name="settings" options={{ title: "Settings" }} />
            <Tabs.Screen name="subscriptions/[id]" options={{ href: null }} /> */}
        </Tabs>
    )
}

export default TabLayout