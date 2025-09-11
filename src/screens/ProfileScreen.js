import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Switch,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useAuth } from "../context/AuthContext";

export default function ProfileScreen() {
  const { user, login, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(!user);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    language: "english",
    notifications: true,
  });

  const handleLogin = async () => {
    if (!loginData.email || !loginData.password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const result = await login(loginData.email, loginData.password);
    if (result.success) {
      setShowLoginForm(false);
      setProfileData({
        name: user?.name || "Demo User",
        email: loginData.email,
        phone: "+91 9876543210",
        language: "english",
        notifications: true,
      });
    } else {
      Alert.alert("Login Failed", result.error || "Invalid credentials");
    }
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: () => {
          logout();
          setShowLoginForm(true);
        },
      },
    ]);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    Alert.alert("Success", "Profile updated successfully");
  };

  if (showLoginForm) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.loginContainer}>
          <Icon name="person" size={80} color="#FF6B35" />
          <Text style={styles.loginTitle}>Welcome to BhaktiBhraman</Text>
          <Text style={styles.loginSubtitle}>
            Sign in to access your profile
          </Text>

          <View style={styles.inputContainer}>
            <Icon
              name="email"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              value={loginData.email}
              onChangeText={(value) =>
                setLoginData((prev) => ({ ...prev, email: value }))
              }
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              value={loginData.password}
              onChangeText={(value) =>
                setLoginData((prev) => ({ ...prev, password: value }))
              }
              secureTextEntry
              placeholderTextColor="#999"
            />
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signupLink}>
            <Text style={styles.signupText}>
              Don't have an account? Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Icon name="person" size={50} color="#fff" />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{profileData.name}</Text>
          <Text style={styles.profileEmail}>{profileData.email}</Text>
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEditing(!isEditing)}
        >
          <Icon name={isEditing ? "check" : "edit"} size={20} color="#FF6B35" />
        </TouchableOpacity>
      </View>

      {/* Profile Form */}
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Personal Information</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={[styles.profileInput, !isEditing && styles.disabledInput]}
            value={profileData.name}
            onChangeText={(value) =>
              setProfileData((prev) => ({ ...prev, name: value }))
            }
            editable={isEditing}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.profileInput, !isEditing && styles.disabledInput]}
            value={profileData.email}
            onChangeText={(value) =>
              setProfileData((prev) => ({ ...prev, email: value }))
            }
            editable={isEditing}
            keyboardType="email-address"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={[styles.profileInput, !isEditing && styles.disabledInput]}
            value={profileData.phone}
            onChangeText={(value) =>
              setProfileData((prev) => ({ ...prev, phone: value }))
            }
            editable={isEditing}
            keyboardType="phone-pad"
            placeholderTextColor="#999"
          />
        </View>

        {isEditing && (
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveProfile}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Preferences */}
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Preferences</Text>

        <View style={styles.preferenceRow}>
          <View style={styles.preferenceInfo}>
            <Icon name="language" size={24} color="#666" />
            <Text style={styles.preferenceLabel}>Language</Text>
          </View>
          <Text style={styles.preferenceValue}>English</Text>
        </View>

        <View style={styles.preferenceRow}>
          <View style={styles.preferenceInfo}>
            <Icon name="notifications" size={24} color="#666" />
            <Text style={styles.preferenceLabel}>Push Notifications</Text>
          </View>
          <Switch
            value={profileData.notifications}
            onValueChange={(value) =>
              setProfileData((prev) => ({ ...prev, notifications: value }))
            }
            trackColor={{ false: "#E0E0E0", true: "#FF6B35" }}
            thumbColor="#fff"
          />
        </View>
      </View>

      {/* Activity Summary */}
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Activity Summary</Text>

        <View style={styles.activityRow}>
          <Icon name="temple-hindu" size={24} color="#FF6B35" />
          <View style={styles.activityInfo}>
            <Text style={styles.activityLabel}>Temples Visited</Text>
            <Text style={styles.activityValue}>12</Text>
          </View>
        </View>

        <View style={styles.activityRow}>
          <Icon name="favorite" size={24} color="#FF6B35" />
          <View style={styles.activityInfo}>
            <Text style={styles.activityLabel}>Total Donations</Text>
            <Text style={styles.activityValue}>₹5,250</Text>
          </View>
        </View>

        <View style={styles.activityRow}>
          <Icon name="flight" size={24} color="#FF6B35" />
          <View style={styles.activityInfo}>
            <Text style={styles.activityLabel}>Trips Planned</Text>
            <Text style={styles.activityValue}>8</Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="history" size={20} color="#666" />
          <Text style={styles.actionText}>Donation History</Text>
          <Icon name="arrow-forward-ios" size={16} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Icon name="bookmark" size={20} color="#666" />
          <Text style={styles.actionText}>Saved Temples</Text>
          <Icon name="arrow-forward-ios" size={16} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Icon name="help" size={20} color="#666" />
          <Text style={styles.actionText}>Help & Support</Text>
          <Icon name="arrow-forward-ios" size={16} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Icon name="privacy-tip" size={20} color="#666" />
          <Text style={styles.actionText}>Privacy Policy</Text>
          <Icon name="arrow-forward-ios" size={16} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="logout" size={20} color="#fff" />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    paddingTop: 100,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    marginBottom: 8,
  },
  loginSubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    width: "100%",
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
  loginButton: {
    backgroundColor: "#FF6B35",
    paddingVertical: 16,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupLink: {
    marginTop: 20,
  },
  signupText: {
    color: "#FF6B35",
    fontSize: 16,
  },
  profileHeader: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    margin: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#FF6B35",
    justifyContent: "center",
    alignItems: "center",
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  profileEmail: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  editButton: {
    padding: 8,
  },
  formContainer: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 12,
    padding: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  profileInput: {
    backgroundColor: "#F8F8F8",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
  },
  disabledInput: {
    backgroundColor: "#F5F5F5",
    color: "#666",
  },
  saveButton: {
    backgroundColor: "#FF6B35",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  preferenceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  preferenceInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  preferenceLabel: {
    marginLeft: 12,
    fontSize: 16,
    color: "#333",
  },
  preferenceValue: {
    fontSize: 16,
    color: "#666",
  },
  activityRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  activityInfo: {
    marginLeft: 12,
    flex: 1,
  },
  activityLabel: {
    fontSize: 14,
    color: "#666",
  },
  activityValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 2,
  },
  actionContainer: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  actionText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#333",
  },
  logoutButton: {
    backgroundColor: "#E53E3E",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    margin: 16,
    marginBottom: 32,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});
