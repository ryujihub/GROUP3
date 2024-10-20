import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const renderAboutUs = (setIsLoggedIn, setShowAboutUs) => {
  return (
    <View style={styles.container}>
      {/* Logout Button */}
      <TouchableOpacity 
        style={styles.logoutButton} 
        onPress={() => {
          setIsLoggedIn(false);  // Log out the user
          setShowAboutUs(false);  // Return to the Login screen or Dashboard
        }}
      >
        <Ionicons name="log-out-outline" size={24} color="#fff" />
      </TouchableOpacity>

      {/* About Us content */}
      <Image source={require('./assets/manong.jpg')} style={styles.backgroundImage} />
      <View style={styles.aboutUsCard}>
        <Text style={styles.aboutUsTitle}>ABOUT US</Text>
        <Text style={styles.aboutUsSubtitle}>BSIT 3B Group 3</Text>
        <Image source={require('./assets/heart_icon.png')} style={styles.aboutUsIcon} />
      </View>
      <Text style={styles.groupMembersText}>Group Members:</Text>
      <Image source={require('./assets/group_icon.png')} style={styles.groupMembersImage} />

      {/* Footer with Home Button */}
      <View style={styles.footer}>
        {/* Home Button */}
        <TouchableOpacity 
          style={styles.footerButton} 
          onPress={() => setShowAboutUs(false)}  // Go back to the Dashboard
        >
          <Text style={styles.footerButtonText}>Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};



const App = () => {
  const [isEmailLogin, setIsEmailLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);  // To track OTP sending status
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAboutUs, setShowAboutUs] = useState(false);
  


  // Simulate sending OTP
  const sendOtp = () => {
    if (phoneNumber.length >= 10) {
      const generatedOtp = Math.floor(100000 + Math.random() * 900000);  // Generate a 6-digit OTP
      Alert.alert('OTP Sent', `Your OTP is ${generatedOtp}`);  // Show the OTP in an alert (for demo purposes)
      setOtp(generatedOtp.toString());  // Save generated OTP
      setIsOtpSent(true);  // Enable OTP input
    } else {
      Alert.alert('Invalid Phone Number', 'Please enter a valid phone number.');
    }
  };

  // Handle login for email/password or OTP
  const handleLogin = () => {
    if (isEmailLogin) {
      // Email login logic
      if (email === 'admin' && password === 'admin') {
        setIsLoggedIn(true);
      } else {
        Alert.alert('Invalid credentials', 'Please enter the correct email and password.');
      }
    } else {
      // Phone login with OTP logic
      if (isOtpSent) {
        if (otp === '123456') {  // Use the generated OTP for validation
          setIsLoggedIn(true);
        } else {
          Alert.alert('Invalid OTP', 'Please enter the correct OTP.');
        }
      } else {
        sendOtp();  // Send OTP if not already sent
      }
    }
  };
 // Dashboard screen to show after login
 const renderDashboard = () => {
  
  return (
    <View style={styles.dashboardContainer}>

      
      {/* Logout Button */}
      <TouchableOpacity 
        style={styles.logoutButton} 
        onPress={() => setIsLoggedIn(false)}
      >
        <Ionicons name="log-out-outline" size={24} color="#fff" />
      </TouchableOpacity>
      <View style={styles.dashboardBox}>
        <Image source={require('./assets/womantread.png')} style={styles.dashboardImage} />
      </View>
      <Text style={styles.welcomeText}>Welcome to your Physical Education.</Text>
      <View style={styles.lineContainer}>
        <View style={styles.dot} />
        <View style={styles.separatorLine} />
        <View style={styles.dot} />
      </View>
      <Text style={styles.dashboardText}>Dashboard</Text>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
           style={styles.footerButton} 
           onPress={() => {
             setShowAboutUs(true);
             
           }}
        >
          <Text style={styles.footerButtonText}>About Us</Text>
        </TouchableOpacity>
      </View>
    </View>    
  );
};
  // About Us screen to show after login
 
  const renderLogin = () => {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={require('./assets/strongman.png')} style={styles.logo} />
        </View>

        <View style={styles.card}>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, isEmailLogin ? styles.activeTab : null]}
              onPress={() => setIsEmailLogin(true)}
            >
              <Text style={styles.tabText}>Email</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, !isEmailLogin ? styles.activeTab : null]}
              onPress={() => setIsEmailLogin(false)}
            >
              <Text style={styles.tabText}>Phone Number</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.loginTitle}>
            Login With {isEmailLogin ? 'Email' : 'Phone Number'}
          </Text>

          {isEmailLogin ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Enter email Id"
                placeholderTextColor="#8c8c8c"
                value={email}
                onChangeText={setEmail}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter Password"
                secureTextEntry
                placeholderTextColor="#8c8c8c"
                value={password}
                onChangeText={setPassword}
              />
            </>
          ) : isOtpSent ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Enter OTP"
                placeholderTextColor="#8c8c8c"
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
              />
            </>
          ) : (
            <View style={styles.phoneInputContainer}>
              <TextInput
                style={styles.countryCodeInput}
                placeholder="+91"
                placeholderTextColor="#8c8c8c"
                keyboardType="phone-pad"
              />
              <TextInput
                style={[styles.input, styles.phoneInput]}
                placeholder="Enter Phone Number"
                placeholderTextColor="#8c8c8c"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
            </View>
          )}

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>
              {isEmailLogin ? 'Login' : isOtpSent ? 'Verify OTP' : 'Send OTP'}
            </Text>
          </TouchableOpacity>
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don’t have an account?</Text>
            <TouchableOpacity>
              <Text style={styles.createAccount}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </View>

          <Text style={styles.tryAnother}>Try another way?</Text>
        
      </View>
        
    );
  };

  return showAboutUs ? renderAboutUs(setIsLoggedIn, setShowAboutUs) : (isLoggedIn ? renderDashboard() : renderLogin());
  
};
  const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4c983',
    
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 390,
    height: 222.6,
    borderRadius: 110,
    backgroundColor: '#f0ad4e',
  },
  card: {
    width: width * 0.9,
    backgroundColor: '#efb572',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
    elevation: 10,
    borderWidth: 2,
    
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: '#ded0b8',
    borderRadius: 20,
    padding: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 10 },
    elevation: 5,
    borderWidth: 1,
    width: 280,
    height: 56,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: '#ded0b8',
  },
  activeTab: {
    backgroundColor: '#d05e5e',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  loginTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#efb572',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 45,
    borderWidth: 1,
    borderColor: '#000000',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  countryCodeInput: {
    backgroundColor: '#efb572',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 44,
    borderWidth: 1,
    borderColor: '#000',
    width: 60,
    marginRight: 10,
    textAlign: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  phoneInput: {
    flex: 1,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    color: '#0033ff',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#8200ff',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    color: '#000',
  },
  
  createAccount: {
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  tryAnother: {
    marginTop: 10,
    color: '#000',
    fontSize: 14,
  },
  aboutUsButton: {
    marginLeft: 10,
    backgroundColor: '#8200ff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  aboutUsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0, // Adjust as needed
    left: 0,
    width: '100%',
    height: 400,  // Adjust height as needed
    resizeMode: 'cover',  // Ensure the image covers the area
     
  
  },
 
  aboutUsCard: {
    position:'absolute',
    top: 390,
    alignItems:  'center',
    width: '100%',
    padding: 10,
    backgroundColor: '#f5c1a2', // Card background color
    borderRadius: 10, // Rounded corners
    marginTop: 5, // Space between card and next section
    shadowOffset: { width: 0, height: 2 }, // Optional: Shadow offset
    shadowColor: '#333', // Optional: Shadow color
    shadowOpacity: 0.1, // Optional: Shadow opacity
    shadowRadius: 4, // Optional: Shadow radius
},
aboutUsIcon: {
position: 'absolute', // Position the icon absolutely within the card
        left: 310, // X coordinate
        top: 10, // Y coordinate
        width: 40, // Adjust based on your icon size
        height: 40,
},
  aboutUsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 0,            // Space between title text and image
  },
  spacer: {
    flex: 1, // Take up the available space to push the next section down
},
  groupMembersSection: {
    alignItems: 'center', // Center contents of the Group Members section
    marginBottom: 20, // Optional: Space below the section
},
groupMembersImage: {
  width: 150,
  height: 150,
  marginTop: 10, // Space above the image
},
groupMembersText: {
  fontSize: 18, // Adjust font size as needed
  fontWeight: 'bold',
  marginTop: 400, // Space between card and text
},
dashboardContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f4c983',
},
dashboardBox: {
  position: 'absolute', // Place the image box at the top
  top: 50, // Distance from the top of the screen
  backgroundColor: '#f0ad4e',
  borderRadius: 90, // Rounded edges for the box
  padding: 20,
  width: width * 1,
  height: height * 0.25,
  justifyContent: 'center',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowRadius: 5,
  shadowOffset: { width: 0, height: 5 },
  elevation: 10,
},
dashboardImage: {
  width: 150,  // Reduced width for the smaller image
  height: 150, // Reduced height for the smaller image
  borderRadius: 20, // Keeping the rounded corners for consistency
},
welcomeText: {
  fontSize: 24,
  fontWeight: 'bold',
  color: '#000',
  marginTop: -200, // Position below the dashboardBox
},
lineContainer: {
  flexDirection: 'row',  // Align dots and line in a row
  alignItems: 'center',  // Vertically align dots and line
  marginVertical: 10,    // Space above and below the line
},
dot: {
  width: 5,           // Diameter of the dot
  height: 5,          // Diameter of the dot
  borderRadius: 5,     // Makes the dot round
  backgroundColor: '#000',  // Color of the dot
},
separatorLine: {
  width: 320,  // Width of the line between the dots
  height: 2,           // Thickness of the line
  backgroundColor: '#000',  // Line color (black)
  marginHorizontal: 0,  // Spacing between dot and line
},

dashboardText: {
  fontSize: 20,
  color: '#000',
},
logoutButton: {
  position: 'absolute',
  top: 40, // Adjust as needed
  right: 20, // Adjust as needed
  backgroundColor: '#d05e5e',
  padding: 10,
  borderRadius: 50, // Make it circular
  zIndex: 1,
},
logoutButtonText: {
  color: '#000',
  fontWeight: 'bold',
  fontSize: 16,
},
footer: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  flexDirection: 'row',
  justifyContent: 'space-around',
  backgroundColor: '#efb572',
  paddingVertical: 10,
},
footerButton: {
  paddingVertical: 10,
  paddingHorizontal: 20,
},
footerButtonText: {
  color: '#000',
  fontWeight: 'bold',
  fontSize: 16,
},
});

export default App;