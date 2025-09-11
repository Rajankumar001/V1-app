BhaktiBhraman - Temple Travel & Donation App
A comprehensive React Native mobile application for temple travel planning, cost estimation, hotel booking, and temple donations.

Features
🏛️ Temple Directory
Search and filter temples by location, deity, and popularity
Detailed temple information with history, timings, and festivals
High-quality temple images and ratings
Verified temple trust badges
🤖 AI-Powered Trip Planning
Intelligent cost estimation using AI APIs (OpenAI, Anthropic, Cohere, Mistral)
Multiple travel modes (Flight, Train, Car)
Detailed cost breakdown (transport, accommodation, food, etc.)
Smart travel tips and recommendations
Fallback deterministic estimation when AI is unavailable
🏨 Hotel Booking
Hotels near temples with real-time availability
Filter by price, rating, distance, and amenities
Detailed hotel information with photos and reviews
Direct booking integration
💰 Temple Donations
Secure donations via Razorpay/PayU integration
Preset donation amounts (₹51, ₹101, ₹501, ₹1001, ₹2500)
Custom donation amounts
Multiple donation purposes (General, Prasad, Maintenance, Festivals)
Digital receipts with temple logos
Verified temple trust system
👤 User Management
Email/password authentication with JWT
User profiles with donation history
Saved temples and trip preferences
Activity tracking and statistics
🌐 Internationalization
English and Hindi language support
Seamless language switching
Culturally appropriate content
Tech Stack
Frontend
React Native with Expo
NativeWind for Tailwind CSS styling
React Navigation for navigation
React Native Paper for UI components
Vector Icons for iconography
Expo Linear Gradient for gradients
Backend (Planned)
Node.js with Express
MongoDB Atlas for database
JWT for authentication
Razorpay/PayU for payments
Google Maps API for distance calculation
AI Integration
OpenAI GPT-4o-mini (primary)
Anthropic Claude
Cohere
Mistral AI
Fallback deterministic estimation
Installation & Setup
Prerequisites
Node.js (v16 or higher)
npm or yarn
Expo CLI
Android Studio / Xcode (for device testing)
1. Clone Repository
git clone <repository-url>
cd bhaktibhraman
2. Install Dependencies
npm install
# or
yarn install
3. Environment Configuration
cp .env.example .env
Edit .env file with your API keys:

AI_PROVIDER=openai
AI_API_KEY=your_openai_api_key
RAZORPAY_KEY_ID=your_razorpay_key
GOOGLE_MAPS_API_KEY=your_google_maps_key
4. Start Development Server
npm start
# or
yarn start
5. Run on Device/Simulator
Android: npm run android
iOS: npm run ios
Web: npm run web
AI Provider Setup
The app supports multiple AI providers with automatic fallback:

OpenAI (Recommended)
AI_PROVIDER=openai
AI_API_KEY=sk-your-openai-key
AI_MODEL=gpt-4o-mini
Anthropic Claude
AI_PROVIDER=anthropic
AI_API_KEY=your-anthropic-key
Cohere
AI_PROVIDER=cohere
AI_API_KEY=your-cohere-key
Mistral AI
AI_PROVIDER=mistral
AI_API_KEY=your-mistral-key
Fallback Mode
If no AI API key is provided, the app automatically uses deterministic cost estimation based on:

Travel distance and mode
Duration and number of travelers
Budget level preferences
Historical cost data
Project Structure
bhaktibhraman/
├── src/
│   ├── components/          # Reusable UI components
│   │   └── TabNavigator.js  # Bottom tab navigation
│   ├── screens/             # App screens
│   │   ├── HomeScreen.js    # Temple directory
│   │   ├── PlanTripScreen.js # Trip planning form
│   │   ├── CostEstimateScreen.js # AI cost breakdown
│   │   ├── HotelsScreen.js  # Hotel listings
│   │   ├── DonationScreen.js # Temple donations
│   │   └── ProfileScreen.js # User profile
│   ├── services/            # API and business logic
│   │   └── aiProvider.js    # AI cost estimation
│   ├── context/             # React Context providers
│   │   └── AuthContext.js   # Authentication state
│   ├── data/                # Sample data
│   │   ├── temples.json     # Temple directory
│   │   └── hotels.json      # Hotel listings
│   └── utils/               # Utility functions
│       └── i18n.js          # Internationalization
├── App.js                   # Main app component
├── package.json             # Dependencies and scripts
├── babel.config.js          # Babel configuration
├── tailwind.config.js       # Tailwind CSS config
└── README.md               # This file
Key Features Implementation
AI Cost Estimation
Single getTripEstimate() function with provider abstraction
Structured JSON response with cost breakdown and tips
Deterministic guards to ensure reasonable estimates
Automatic fallback for demo mode
Payment Integration
Razorpay SDK integration for secure payments
Digital receipt generation with temple branding
Donation history tracking
Multiple payment methods support
Temple Data Management
JSON-based temple database with rich metadata
Search and filtering capabilities
Verified trust system with badges
Image and rating management
Internationalization
Complete English/Hindi translation system
Cultural adaptation for Indian users
Dynamic language switching
Locale-specific formatting
Development Guidelines
Code Style
ESLint configuration for consistent code style
Prettier for code formatting
Component-based architecture
Proper error handling and loading states
Testing
Unit tests for utility functions
Integration tests for API calls
UI testing with React Native Testing Library
Manual testing on multiple devices
Performance
Optimized image loading and caching
Efficient list rendering with FlatList
Proper memory management
Smooth animations and transitions
Deployment
Mobile App Deployment
Android (Google Play Store)

expo build:android
iOS (App Store)

expo build:ios
Backend Deployment (Separate Repository)
Railway: Easy Node.js deployment
Render: Free tier available
Heroku: Traditional PaaS option
AWS/GCP: Enterprise-grade hosting
API Documentation
Cost Estimation API
// Input
{
  from: "Delhi",
  toTemple: "Golden Temple, Amritsar",
  travelMode: "flight",
  duration: "3",
  travelers: "2",
  budgetLevel: "medium"
}

// Output
{
  breakdown: {
    transportation: 8500,
    accommodation: 4200,
    food: 2100,
    templeEntry: 500,
    localTransport: 1200,
    miscellaneous: 1000
  },
  total: 17500,
  aiTips: ["Travel on weekdays to save 15-20% on hotel costs..."]
}
Temple Search API
// Filter temples by deity, location, rating
GET /api/temples?deity=vishnu&location=punjab&rating=4+
Donation API
// Process temple donation
POST /api/donations
{
  templeId: "temple_123",
  amount: 501,
  purpose: "general",
  userId: "user_456"
}
Contributing
Fork the repository
Create a feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request
License
This project is licensed under the MIT License - see the LICENSE file for details.

Support
For support and questions:

Email: support@bhaktibhraman.com
GitHub Issues: Create an issue
Documentation: Wiki
Acknowledgments
Temple data sourced from verified religious organizations
AI cost estimation powered by leading AI providers
Payment processing secured by Razorpay
Maps and location services by Google Maps API
Icons by Material Design Icons
UI inspiration from modern travel apps
BhaktiBhraman - Connecting devotees with divine destinations through technology 🙏


