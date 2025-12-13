import { Stack } from "expo-router";
import "./globals.css";
import { StatusBar } from "react-native";

import { client, account } from "@/services/appwrite";
import { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    // Attempt to connect to Appwrite to verify usage
    // Even a 401 error means the connection logic is working
    account.get().then(
      () => console.log("Appwrite connected (Session exists)"),
      (error) => console.log("Appwrite connected (No session)", error.message)
    );
  }, []);

  return (
    <>
      <StatusBar hidden={true} />

      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="movie/[id]"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}
