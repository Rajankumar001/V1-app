import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Picker } from "@react-native-picker/picker";

export default function PlanTripScreen({ navigation }) {
  const [formData, setFormData] = useState({
    from: "",
    toTemple: "",
    travelMode: "flight",
    duration: "3",
    travelDate: "",
    travelers: "2",
    budgetLevel: "medium",
  });

  const travelModes = [
    { label: "Flight", value: "flight", icon: "flight" },
    { label: "Train", value: "train", icon: "train" },
    { label: "Car", value: "car", icon: "directions-car" },
  ];

  const budgetLevels = [
    { label: "Budget", value: "budget" },
    { label: "Medium", value: "medium" },
    { label: "Luxury", value: "luxury" },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePlanTrip = () => {
    if (!formData.from || !formData.toTemple) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    // Navigate to cost estimate screen with form data
    navigation.navigate("CostEstimate", { tripData: formData });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        {/* From Location */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>From</Text>
          <View style={styles.inputContainer}>
            <Icon
              name="my-location"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Your current location"
              value={formData.from}
              onChangeText={(value) => handleInputChange("from", value)}
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* To Temple */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>To Temple</Text>
          <View style={styles.inputContainer}>
            <Icon
              name="temple-hindu"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Select temple destination"
              value={formData.toTemple}
              onChangeText={(value) => handleInputChange("toTemple", value)}
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Travel Mode */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Travel Mode</Text>
          <View style={styles.inputContainer}>
            <Icon
              name="flight"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.travelMode}
                onValueChange={(value) =>
                  handleInputChange("travelMode", value)
                }
                style={styles.picker}
              >
                {travelModes.map((mode) => (
                  <Picker.Item
                    key={mode.value}
                    label={mode.label}
                    value={mode.value}
                  />
                ))}
              </Picker>
            </View>
          </View>
        </View>

        {/* Duration */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Duration (Days)</Text>
          <View style={styles.inputContainer}>
            <Icon
              name="calendar-today"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="3"
              value={formData.duration}
              onChangeText={(value) => handleInputChange("duration", value)}
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Travel Date */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Travel Date</Text>
          <View style={styles.inputContainer}>
            <Icon
              name="date-range"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="mm/dd/yyyy"
              value={formData.travelDate}
              onChangeText={(value) => handleInputChange("travelDate", value)}
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Number of Travelers */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Number of Travelers</Text>
          <View style={styles.inputContainer}>
            <Icon
              name="people"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="2"
              value={formData.travelers}
              onChangeText={(value) => handleInputChange("travelers", value)}
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Budget Level */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Budget Level</Text>
          <View style={styles.inputContainer}>
            <Icon
              name="account-balance-wallet"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.budgetLevel}
                onValueChange={(value) =>
                  handleInputChange("budgetLevel", value)
                }
                style={styles.picker}
              >
                {budgetLevels.map((level) => (
                  <Picker.Item
                    key={level.value}
                    label={level.label}
                    value={level.value}
                  />
                ))}
              </Picker>
            </View>
          </View>
        </View>

        {/* Plan Trip Button */}
        <TouchableOpacity style={styles.planButton} onPress={handlePlanTrip}>
          <Text style={styles.planButtonText}>Get Cost Estimate</Text>
          <Icon name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  formContainer: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  pickerContainer: {
    flex: 1,
  },
  picker: {
    flex: 1,
    height: 40,
  },
  planButton: {
    backgroundColor: "#FF6B35",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  planButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 8,
  },
});
