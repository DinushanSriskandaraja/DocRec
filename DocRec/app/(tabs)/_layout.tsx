// TabLayout.tsx
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

// Animated Icon Component (same as before)
const AnimatedIcon = ({
  name,
  size,
  focused,
  color,
}: {
  name: keyof typeof Ionicons.glyphMap;
  size: number;
  focused: boolean;
  color: string;
}) => {
  const scale = useSharedValue(focused ? 1.18 : 1);

  React.useEffect(() => {
    scale.value = focused ? 1.18 : 1;
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: withSpring(scale.value, { damping: 12, stiffness: 140 }) },
    ],
  }));

  return (
    <Animated.View
      style={[
        animatedStyle,
        { alignItems: "center", justifyContent: "center" },
      ]}>
      <Ionicons name={name} size={size} color={color} />
    </Animated.View>
  );
};

// Custom tab bar renderer
const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  // map route name -> icon name
  const getIconName = (routeName: string) => {
    if (routeName === "index") return "home";
    if (routeName === "chatScreen") return "chatbubble-ellipses";
    if (routeName === "appoinments") return "calendar";
    if (routeName === "profile") return "person";
    return "ellipse";
  };

  return (
    // wrapper ensures the bar is centered horizontally, and sits above bottom safe area
    <View style={styles.wrapper} pointerEvents="box-none">
      <View
        style={[
          styles.tabBar,
          {
            backgroundColor: theme.background,
            shadowColor: "#000",
            shadowOpacity: 0.15,
            shadowOffset: { width: 0, height: 6 },
            shadowRadius: 10,
            elevation: 6,
            borderColor: "rgba(0,0,0,0.06)",
          },
        ]}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const iconName = getIconName(route.name);
          const size = route.name === "appoinments" ? 36 : 26;
          const color = focused ? theme.primary : theme.card;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({ type: "tabLongPress", target: route.key });
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={focused ? { selected: true } : {}}
              onPress={onPress}
              onLongPress={onLongPress}
              activeOpacity={0.8}
              style={styles.tabButton}>
              <AnimatedIcon
                name={iconName as any}
                size={size}
                focused={focused}
                color={color}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default function TabLayout() {
  // NOTE: we removed tabBarButton: HapticTab from here to avoid layout interference.
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
      // supply our custom bar
      tabBar={(props) => <CustomTabBar {...props} />}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="chatScreen" />
      <Tabs.Screen name="appoinments" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  // Full-width wrapper to place the rounded bar in the horizontal center of the screen
  wrapper: {
    position: "absolute",
    bottom: 25,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 99,
  },

  // The rounded bar that holds buttons (fixed pixel width centered on screen)
  tabBar: {
    width: 300,
    height: 75,
    borderRadius: 40,
    flexDirection: "row",
    justifyContent: "space-evenly", // even spacing across the 300 px bar
    alignItems: "center",
    borderWidth: 1,
    overflow: "hidden",
    paddingHorizontal: 0,
  },

  // Individual touchable area for each icon
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
});
