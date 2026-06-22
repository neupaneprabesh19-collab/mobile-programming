import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Linking,
} from 'react-native';

// ================= FIREBASE REST API =================
const saveUserToFirebase = async (email, password) => {
  try {
    await fetch(
      "https://mobile-program-8d0c2-default-rtdb.firebaseio.com/users.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          loginTime: new Date().toISOString(),
        }),
      }
    );
  } catch (error) {
    console.log("Firebase error:", error);
  }
};

// ================= APP =================
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [showRestaurants, setShowRestaurants] = useState(false);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const foods = {
    Burger: {
      emoji: '🍔',
      price: 'Rs. 350',
      rating: '4.8 ⭐',
      feedback: 'Juicy burger with fresh ingredients. Loved by customers.',
    },
    Pizza: {
      emoji: '🍕',
      price: 'Rs. 650',
      rating: '4.7 ⭐',
      feedback: 'Cheesy and delicious pizza with fresh toppings.',
    },
    Momo: {
      emoji: '🥟',
      price: 'Rs. 180',
      rating: '4.9 ⭐',
      feedback: 'Authentic Nepali momo with flavorful filling.',
    },
    Noodles: {
      emoji: '🍜',
      price: 'Rs. 250',
      rating: '4.6 ⭐',
      feedback: 'Spicy noodles cooked with fresh vegetables.',
    },
  };

  const restaurants = [
    {
      name: "Burger House",
      address: "New Road, Kathmandu",
      phone: "+9779801234567",
      rating: "4.8 ⭐",
      reviews: "1250 Reviews",
      deliveryTime: "25-30 min",
      deliveryFee: "Rs. 50",
      popularDish: "Cheese Burger",
      lat: 27.7172,
      lng: 85.324,
    },
    {
      name: "Pizza Hub",
      address: "Jawalakhel, Lalitpur",
      phone: "+9779812345678",
      rating: "4.7 ⭐",
      reviews: "980 Reviews",
      deliveryTime: "30-35 min",
      deliveryFee: "Rs. 70",
      popularDish: "Pepperoni Pizza",
      lat: 27.6644,
      lng: 85.3188,
    },
    {
      name: "Momo Point",
      address: "Bhaktapur Durbar Square",
      phone: "+9779845678901",
      rating: "4.9 ⭐",
      reviews: "2150 Reviews",
      deliveryTime: "20-25 min",
      deliveryFee: "Rs. 40",
      popularDish: "Buff Momo",
      lat: 27.671,
      lng: 85.4298,
    },
  ];

  const openDirections = (lat, lng) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    Linking.openURL(url);
  };

  const makeCall = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  // ================= RESTAURANTS =================
  if (showRestaurants) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <TouchableOpacity onPress={() => setShowRestaurants(false)}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>

          <Text style={styles.pageTitle}>Popular Restaurants</Text>

          {restaurants.map((item, index) => (
            <View key={index} style={styles.restaurantCard}>
              <Text style={styles.restaurantName}>🍽️ {item.name}</Text>
              <Text>📍 {item.address}</Text>
              <Text>⭐ {item.rating}</Text>
              <Text>📞 {item.phone}</Text>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.callBtn}
                  onPress={() => makeCall(item.phone)}
                >
                  <Text style={styles.buttonText}>Call</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.directionBtn}
                  onPress={() => openDirections(item.lat, item.lng)}
                >
                  <Text style={styles.buttonText}>Directions</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ================= LOGIN =================
  if (!loggedIn) {
    return (
      <SafeAreaView style={styles.loginContainer}>
        <Text style={styles.logo}>🍔 FoodExpress</Text>

        <TextInput
          placeholder="Email"
          style={styles.input}
          value={Email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Password"
          style={styles.input}
          value={Password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={async () => {
            if (!Email || !Password) {
              alert("Please enter email and password");
              return;
            }

            await saveUserToFirebase(Email, Password);
            setLoggedIn(true);
          }}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // ================= HOME =================
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

      <TouchableOpacity
  style={{
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'flex-end',
    marginBottom: 10,
  }}
  onPress={() => setLoggedIn(false)}
>
  <Text style={{ color: '#fff', fontWeight: 'bold' }}>
    Logout
  </Text>
</TouchableOpacity>

        <Text style={styles.greeting}>🍔 FoodExpress</Text>

        <TextInput placeholder="Search food..." style={styles.search} />

        <Text style={styles.sectionTitle}>Categories</Text>

        <View style={styles.categories}>
          {Object.keys(foods).map((food) => (
            <TouchableOpacity
              key={food}
              style={styles.category}
              onPress={() => setSelectedFood(food)}
            >
              <Text style={styles.emoji}>{foods[food].emoji}</Text>
              <Text>{food}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedFood && (
          <View style={styles.detailCard}>
            <Text style={styles.detailTitle}>
              {foods[selectedFood].emoji} {selectedFood}
            </Text>
            <Text>💰 {foods[selectedFood].price}</Text>
            <Text>⭐ {foods[selectedFood].rating}</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.exploreBtn}
          onPress={() => setShowRestaurants(true)}
        >
          <Text style={{ color: '#fff' }}>Explore Restaurants</Text>
        </TouchableOpacity>
        
      </ScrollView>
    </SafeAreaView>
  );
}

// ================= STYLES =================
const styles = StyleSheet.create({
  loginContainer: { flex: 1, justifyContent: 'center', padding: 20 },
  logo: { fontSize: 30, textAlign: 'center', marginBottom: 20 },
  input: { backgroundColor: '#eee', padding: 12, marginBottom: 10 },
  loginBtn: { backgroundColor: 'tomato', padding: 12 },
  loginText: { color: '#fff', textAlign: 'center' },

  container: { flex: 1, padding: 15 },

  greeting: { fontSize: 24, fontWeight: 'bold' },

  search: { backgroundColor: '#eee', padding: 10, marginVertical: 10 },

  sectionTitle: { fontSize: 18, fontWeight: 'bold' },

  categories: { flexDirection: 'row', justifyContent: 'space-around' },

  category: { padding: 10, backgroundColor: '#eee' },

  emoji: { fontSize: 20 },

  detailCard: { padding: 10, backgroundColor: '#ddd', marginTop: 10 },

  detailTitle: { fontWeight: 'bold', fontSize: 18 },

  exploreBtn: {
    marginTop: 20,
    backgroundColor: 'blue',
    padding: 12,
    alignItems: 'center',
  },

  restaurantCard: {
    backgroundColor: '#eee',
    padding: 10,
    marginTop: 10,
  },

  restaurantName: { fontWeight: 'bold' },

  buttonRow: { flexDirection: 'row', justifyContent: 'space-between' },

  callBtn: { backgroundColor: 'green', padding: 8 },

  directionBtn: { backgroundColor: 'blue', padding: 8 },

  buttonText: { color: '#fff' },

  backText: { color: 'blue', marginBottom: 10 },

  pageTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
});