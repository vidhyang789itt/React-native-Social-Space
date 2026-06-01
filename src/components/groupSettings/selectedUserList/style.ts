import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },

  title: {
    fontSize: 14,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 10,
  },

  scrollContent: {
    paddingRight: 8,
  },

  userChip: {
    width: 88,
    alignItems: "center",
    marginRight: 12,
    backgroundColor: "#F5F3FF",
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 8,
    position: "relative",
    borderWidth: 1,
    borderColor: "#DDD6FE",
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#E5E7EB",
    marginBottom: 8,
  },

  username: {
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
    textAlign: "center",
  },

  removeButton: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#EF4444",
    justifyContent: "center",
    alignItems: "center",
  },
});