import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  listContent: {
    paddingBottom: 20,
  },

  
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#E5E7EB",

    borderRadius: 14,

    paddingHorizontal: 14,
    paddingVertical: 12,

    marginBottom: 16,
  },

  searchInput: {
    flex: 1,

    marginLeft: 10,

    fontSize: 15,
    color: "#111827",
  },

  
  item: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#E5E7EB",

    borderRadius: 16,

    padding: 14,

    marginBottom: 10,
  },

  selectedItem: {
    borderColor: "#7C3AED",
    backgroundColor: "#F5F3FF",
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,

    marginRight: 12,

    backgroundColor: "#F3F4F6",
  },

  userInfo: {
    flex: 1,
    justifyContent: "center",
  },

  userName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },

  userStatus: {
    marginTop: 2,

    fontSize: 12,
    color: "#6B7280",
  },

  profileLink: {
    width: 34,
    height: 34,

    borderRadius: 17,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#F5F3FF",

    marginRight: 10,
  },

  
  checkbox: {
    width: 24,
    height: 24,

    borderRadius: 12,

    borderWidth: 2,
    borderColor: "#D1D5DB",

    justifyContent: "center",
    alignItems: "center",
  },

  checkboxSelected: {
    backgroundColor: "#7C3AED",
    borderColor: "#7C3AED",
  },

  
  emptyState: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 30,
    paddingVertical: 40,
  },

  emptyTitle: {
    marginTop: 12,

    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
  },

  emptyDescription: {
    marginTop: 6,

    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
  },
});