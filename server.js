const app = require("./app.js")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config();

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {{
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}})
.catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
});