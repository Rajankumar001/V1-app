import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import temples from "../data/temples.json";

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDeity, setSelectedDeity] = useState("");
  const [filteredTemples, setFilteredTemples] = useState(temples);

  const deities = ["Vishnu", "Devi", "Ganesh", "Shiva", "Krishna"];

  const filterTemples = React.useCallback(() => {
    let filtered = temples;

    if (searchQuery) {
      filtered = filtered.filter(
        (temple) =>
          temple.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          temple.location.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (selectedDeity) {
      filtered = filtered.filter((temple) =>
        temple.deity.toLowerCase().includes(selectedDeity.toLowerCase()),
      );
    }

    setFilteredTemples(filtered);
  }, [searchQuery, selectedDeity]);

  useEffect(() => {
    filterTemples();
  }, [filterTemples]);

  const renderTempleCard = ({ item }) => (
    <TouchableOpacity style={styles.templeCard}>
      <LinearGradient
        colors={["#FF6B35", "#FF8A50"]}
        style={styles.templeImageContainer}
      >
        <Icon name="temple-hindu" size={40} color="#fff" />
        <Text style={styles.templeImageText}>Temple Image</Text>
      </LinearGradient>

      <View style={styles.templeInfo}>
        <Text style={styles.templeName}>{item.name}</Text>
        <View style={styles.locationRow}>
          <Icon name="location-on" size={16} color="#666" />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>

        <View style={styles.ratingRow}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Icon
              key={star}
              name="star"
              size={16}
              color={star <= item.rating ? "#FFD700" : "#E0E0E0"}
            />
          ))}
          <Text style={styles.ratingText}>
            {item.rating} ({item.reviews} reviews)
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderDeityChip = (deity) => (
    <TouchableOpacity
      key={deity}
      style={[
        styles.deityChip,
        selectedDeity === deity && styles.selectedDeityChip,
      ]}
      onPress={() => setSelectedDeity(selectedDeity === deity ? "" : deity)}
    >
      <Text
        style={[
          styles.deityChipText,
          selectedDeity === deity && styles.selectedDeityChipText,
        ]}
      >
        {deity}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search temples, places..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      {/* Deity Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.deityContainer}
        contentContainerStyle={styles.deityContent}
      >
        {deities.map(renderDeityChip)}
      </ScrollView>

      {/* Featured Temples */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Featured Temples</Text>

        <FlatList
          data={filteredTemples}
          renderItem={renderTempleCard}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  deityContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  deityContent: {
    paddingRight: 16,
  },
  deityChip: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 2,
    borderColor: "#FF6B35",
  },
  selectedDeityChip: {
    backgroundColor: "#FF6B35",
  },
  deityChipText: {
    color: "#FF6B35",
    fontWeight: "500",
  },
  selectedDeityChipText: {
    color: "#fff",
  },
  sectionContainer: {
    margin: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  templeCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: "hidden",
  },
  templeImageContainer: {
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  templeImageText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  templeInfo: {
    padding: 16,
  },
  templeName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  locationText: {
    marginLeft: 4,
    color: "#666",
    fontSize: 14,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 8,
    color: "#666",
    fontSize: 14,
  },
});
