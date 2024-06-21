const mongoose = require("mongoose"); // Import mongoose for MongoDB interactions
const { User, Thought } = require("./models"); // Import the User and Thought models

// Connect to the MongoDB database named 'socialnetwork'
mongoose.connect("mongodb://localhost:27017/socialnetwork", {
  useNewUrlParser: true, // Use the new URL parser to avoid deprecation warnings
  useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
});

// Get the default connection
const db = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "connection error:"));
// Once the connection is open, log a success message
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Define an array of users to be inserted into the database
const users = [
  {
    username: "john_doe",
    email: "john_doe@gmail.com",
    friends: [],
    thoughts: [],
  },
  {
    username: "jane_doe",
    email: "jane_doe@gmail.com",
    friends: [],
    thoughts: [],
  },
  {
    username: "sam_smith",
    email: "sam_smith@gmail.com",
    friends: [],
    thoughts: [],
  },
];

// Define an array of thoughts to be inserted into the database
const thoughts = [
  {
    thoughtText: "This is John's first thought!",
    username: "john_doe",
    reactions: [],
  },
  {
    thoughtText: "This is Jane's first thought!",
    username: "jane_doe",
    reactions: [],
  },
  {
    thoughtText: "This is Sam's first thought!",
    username: "sam_smith",
    reactions: [],
  },
];

// Define an array of reactions to be inserted into the database
const reactions = [
  {
    reactionBody: "Nice thought!",
    username: "jane_doe",
    createdAt: new Date(),
  },
  {
    reactionBody: "I agree!",
    username: "sam_smith",
    createdAt: new Date(),
  },
];

// Define an async function to seed the database
const seedDatabase = async () => {
  try {
    // Delete all existing users and thoughts
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Insert the users and thoughts arrays into the database
    const createdUsers = await User.insertMany(users);
    const createdThoughts = await Thought.insertMany(thoughts);

    // Adding thoughts to users
    await User.findOneAndUpdate(
      { username: "john_doe" },
      { $push: { thoughts: createdThoughts[0]._id } }
    );

    await User.findOneAndUpdate(
      { username: "jane_doe" },
      { $push: { thoughts: createdThoughts[1]._id } }
    );

    await User.findOneAndUpdate(
      { username: "sam_smith" },
      { $push: { thoughts: createdThoughts[2]._id } }
    );

    // Adding friends
    await User.findOneAndUpdate(
      { username: "john_doe" },
      { $push: { friends: createdUsers[1]._id, friends: createdUsers[2]._id } }
    );

    // Adding reactions to thoughts
    await Thought.findOneAndUpdate(
      { _id: createdThoughts[0]._id },
      { $push: { reactions: reactions[0] } }
    );

    await Thought.findOneAndUpdate(
      { _id: createdThoughts[1]._id },
      { $push: { reactions: reactions[1] } }
    );

    console.log("Database seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

// Call the seedDatabase function to start the seeding process
seedDatabase();
