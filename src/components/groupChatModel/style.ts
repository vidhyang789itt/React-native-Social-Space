

import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.55)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },

  modal: {
    width: "100%",
    maxWidth: 520,

    
    height: "95%",          
    maxHeight: "95%",

    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    overflow: "hidden",

    borderWidth: 1,
    borderColor: "#E5E7EB",

    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 24,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    elevation: 14,
  },

  body: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    backgroundColor: "#FFFFFF",
  },

  headerText: {
    flex: 1,
    paddingRight: 12,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
    letterSpacing: -0.4,
  },

  headerDescription: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 20,
    color: "#6B7280",
    fontWeight: "500",
  },

  closeButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
  },

  
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 10,
    backgroundColor: "#FFFFFF",
  },

  stepCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },

  stepCircleActive: {
    backgroundColor: "#7C3AED",
    borderColor: "#7C3AED",
  },

  stepNumber: {
    fontSize: 13,
    fontWeight: "700",
    color: "#9CA3AF",
  },

  stepNumberActive: {
    color: "#FFFFFF",
  },

  stepLine: {
    width: 28,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#E5E7EB",
    marginHorizontal: 4,
  },

  stepLineActive: {
    backgroundColor: "#7C3AED",
  },

  
  label: {
    marginTop: 14,
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "700",
    color: "#374151",
  },

  input: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#111827",
    fontWeight: "500",
  },

  textArea: {
    minHeight: 110,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#111827",
    textAlignVertical: "top",
    fontWeight: "500",
  },

  
  imageStepContainer: {
    alignItems: "center",
    paddingVertical: 12,
  },

  imagePicker: {
    width: width * 0.55,
    height: width * 0.55,
    maxWidth: 220,
    maxHeight: 220,
    borderRadius: 28,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#C4B5FD",
    backgroundColor: "#F5F3FF",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  imagePickerText: {
    color: "#7C3AED",
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
    paddingHorizontal: 20,
  },

  groupImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  
  reviewImage: {
    width: 120,
    height: 120,
    borderRadius: 32,
    alignSelf: "center",
    marginBottom: 18,
  },

  reviewTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
    marginBottom: 8,
  },

  reviewDescription: {
    fontSize: 15,
    lineHeight: 22,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 14,
    paddingHorizontal: 8,
  },

  reviewMembers: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7C3AED",
    textAlign: "center",
  },

  
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    backgroundColor: "#FFFFFF",
    gap: 12,
  },

  backButton: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  backButtonText: {
    color: "#4B5563",
    fontSize: 15,
    fontWeight: "700",
  },

  nextButton: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    backgroundColor: "#7C3AED",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#7C3AED",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 6,
  },

  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.2,
  },

  disabledButton: {
    opacity: 0.5,
  },
});