import { Text, View } from "react-native";
import "./global.css";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-bold text-primary">Welcome!</Text>
      <Text className="text-md font-bold text-secondary-light">Welcome!</Text>
    </View>
  );
}
