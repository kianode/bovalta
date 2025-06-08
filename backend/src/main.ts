import Fastify from "fastify";
import cors from "@fastify/cors"; // 👈 importera cors
import { AppDataSource } from "./config/typeorm.config";
import { usersRoutes } from "./routes/users";

const server = Fastify();

AppDataSource.initialize().then(async () => {
  console.log("📦 Database connected");

  // 👇 aktivera CORS innan routes registreras
  await server.register(cors, {
    origin: "http://localhost:3000", // tillåt bara frontend
    credentials: true, // om du behöver cookies/sessions
  });

  await server.register(usersRoutes);

  server.listen({ port: 4000, host: "0.0.0.0" }, (err, address) => {
    if (err) throw err;
    console.log(`🚀 Server listening at ${address}`);
  });
});
