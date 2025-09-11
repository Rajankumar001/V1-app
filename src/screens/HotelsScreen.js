import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import hotels from "../data/hotels.json";

export default function HotelsScreen() {
  const [filteredHotels, setFilteredHotels] = useState(hotels);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("price"); // price, rating, distance
  const [filterBy, setFilterBy] = useState("all"); // all, budget, premium

  const filterAndSortHotels = React.useCallback(() => {
    let filtered = [...hotels];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (hotel) =>
          hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          hotel.location.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Apply price filter
    if (filterBy === "budget") {
      filtered = filtered.filter((hotel) => hotel.price <= 1500);
    } else if (filterBy === "premium") {
      filtered = filtered.filter((hotel) => hotel.price > 2000);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price":
          return a.price - b.price;
        case "rating":
          return b.rating - a.rating;
        case "distance":
          return parseFloat(a.distance) - parseFloat(b.distance);
        default:
          return 0;
      }
    });

    setFilteredHotels(filtered);
  }, [searchQuery, sortBy, filterBy]);

  useEffect(() => {
    filterAndSortHotels();
  }, [filterAndSortHotels]);

  const renderHotelCard = ({ item }) => (
    <View style={styles.hotelCard}>
      <LinearGradient
        colors={["#FF6B35", "#FF8A50"]}
        style={styles.hotelImageContainer}
      >
        <Icon name="hotel" size={40} color="#fff" />
      </LinearGradient>

      <View style={styles.hotelInfo}>
        <View style={styles.hotelHeader}>
          <Text style={styles.hotelName}>{item.name}</Text>
          <Text style={styles.hotelPrice}>
            ₹{item.price.toLocaleString("en-IN")}/night
          </Text>
        </View>

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
              color={star <= Math.floor(item.rating) ? "#FFD700" : "#E0E0E0"}
            />
          ))}
          <Text style={styles.ratingText}>
            {item.rating} ({item.reviews} reviews)
          </Text>
        </View>

        <View style={styles.amenitiesContainer}>
          {item.amenities.slice(0, 4).map((amenity, index) => (
            <View key={index} style={styles.amenityChip}>
              <Icon name={getAmenityIcon(amenity)} size={12} color="#4CAF50" />
              <Text style={styles.amenityText}>{amenity}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const getAmenityIcon = (amenity) => {
    const iconMap = {
      "Free WiFi": "wifi",
      AC: "ac-unit",
      "Temple View": "visibility",
      Parking: "local-parking",
      Restaurant: "restaurant",
      Pool: "pool",
      Spa: "spa",
      Gym: "fitness-center",
      "Mountain View": "landscape",
      "City View": "location-city",
      "Room Service": "room-service",
    };
    return iconMap[amenity] || "check";
  };

  return (
    <View style={styles.container}>
      {/* Search and Filter Header */}
      <View style={styles.headerContainer}>
        <View style={styles.searchContainer}>
          <Icon
            name="search"
            size={20}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Filter by amenities, price..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
        >
          <TouchableOpacity
            style={[
              styles.filterChip,
              sortBy === "price" && styles.activeFilterChip,
            ]}
            onPress={() => setSortBy("price")}
          >
            <Text
              style={[
                styles.filterText,
                sortBy === "price" && styles.activeFilterText,
              ]}
            >
              Price
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterChip,
              sortBy === "rating" && styles.activeFilterChip,
            ]}
            onPress={() => setSortBy("rating")}
          >
            <Text
              style={[
                styles.filterText,
                sortBy === "rating" && styles.activeFilterText,
              ]}
            >
              Rating
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterChip,
              sortBy === "distance" && styles.activeFilterChip,
            ]}
            onPress={() => setSortBy("distance")}
          >
            <Text
              style={[
                styles.filterText,
                sortBy === "distance" && styles.activeFilterText,
              ]}
            >
              Distance
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterChip,
              filterBy === "budget" && styles.activeFilterChip,
            ]}
            onPress={() =>
              setFilterBy(filterBy === "budget" ? "all" : "budget")
            }
          >
            <Text
              style={[
                styles.filterText,
                filterBy === "budget" && styles.activeFilterText,
              ]}
            >
              Budget
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterChip,
              filterBy === "premium" && styles.activeFilterChip,
            ]}
            onPress={() =>
              setFilterBy(filterBy === "premium" ? "all" : "premium")
            }
          >
            <Text
              style={[
                styles.filterText,
                filterBy === "premium" && styles.activeFilterText,
              ]}
            >
              Premium
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Budget-Friendly Options Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Budget-Friendly Options</Text>
      </View>

      {/* Hotels List */}
      <FlatList
        data={filteredHotels}
        renderItem={renderHotelCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.hotelsList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  headerContainer: {
    backgroundColor: "#fff",
    paddingBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  filterContainer: {
    paddingHorizontal: 16,
  },
  filterChip: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  activeFilterChip: {
    backgroundColor: "#FF6B35",
  },
  filterText: {
    color: "#666",
    fontWeight: "500",
  },
  activeFilterText: {
    color: "#fff",
  },
  sectionHeader: {
    padding: 16,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  hotelsList: {
    padding: 16,
  },
  hotelCard: {
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
  hotelImageContainer: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  hotelInfo: {
    padding: 16,
  },
  hotelHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  hotelPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6B35",
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
    marginBottom: 12,
  },
  ratingText: {
    marginLeft: 8,
    color: "#666",
    fontSize: 14,
  },
  amenitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  amenityChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E8",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  amenityText: {
    marginLeft: 4,
    fontSize: 12,
    color: "#4CAF50",
    fontWeight: "500",
  },
  bookButton: {
    backgroundColor: "#FF6B35",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
