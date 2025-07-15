const express = require("express")
const cors = require("cors")
const app = express()
const authRoutes = require("./routes/authRoutes")
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const teamRoutes = require('./routes/teamRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');


app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use('/api/teams', teamRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);



module.exports = app;