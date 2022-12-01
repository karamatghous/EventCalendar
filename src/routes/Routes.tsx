import React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import EventListing from "../components/eventListing/EventListing";
import AddEvent from "../components/pages/AddEvent";
const Stack = createStackNavigator();

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: "transparent",
    },
};

export default function Routes() {
    return (
        <NavigationContainer theme={theme}>
            {
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen name="EventListing" component={EventListing} />
                    <Stack.Screen name="AddEvent" component={AddEvent} />
                </Stack.Navigator>
            }
        </NavigationContainer>
    );
}
