import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginTop: 16,
  },

  
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  headerTitleWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerTitle: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
  },

  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7C3AED",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },

  addButtonText: {
    marginLeft: 6,
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },

  
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
  },

  emptyText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#9CA3AF",
  },

  
  memberList: {
    gap: 12,
  },

  memberItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  memberCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#E5E7EB",
  },

  memberInfo: {
    flex: 1,
    marginLeft: 12,
  },

  memberName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 6,
  },

  roleBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F3FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },

  roleText: {
    marginLeft: 4,
    fontSize: 11,
    fontWeight: "700",
    color: "#7C3AED",
  },

  youBadge: {
    backgroundColor: "#E0E7FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },

  youText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#4F46E5",
  },

  profileButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  
  removeButton: {
    marginLeft: 10,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FEF2F2",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FECACA",
  },

  disabledButton: {
    opacity: 0.45,
  },
});