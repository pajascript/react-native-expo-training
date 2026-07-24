import { styled } from "nativewind";
import { Platform, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = 
    Platform.OS === "web"
        ? View
        : styled(RNSafeAreaView);
        
export default SafeAreaView;