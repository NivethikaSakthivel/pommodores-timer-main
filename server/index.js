require("dotenv").config(); // Secures variables
const app = require("./utils/app"); // Backend App (server)
const mongo = require("./utils/mongo"); // MongoDB (database)
const { PORT } = require("./constants");
const authRoutes = require("./routes/auth");
const pomodoroRoutes = require("./routes/pomodoro")
const prefRoutes = require('./routes/preferences')
const suggRoutes = require('./routes/suggestions')
const todoRoutes = require('./routes/todos')

async function bootstrap() {
  await mongo.connect();

  // app.get('/', (req, res) => res.status(200).json({message: 'Hello World!'}))
  app.get("/healthz", (req, res) => res.status(200).send());
  app.use("/auth", authRoutes);
  app.use("/pomodoro", pomodoroRoutes);
  app.use("/preferences", prefRoutes);
  app.use("/suggestions", suggRoutes);
  app.use("/todos", todoRoutes);

  app.listen(PORT, () => {
    console.log(`✅ Server is listening on port: ${PORT}`);
  });
}

bootstrap();
