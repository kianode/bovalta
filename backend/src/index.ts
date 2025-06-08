import Fastify from "fastify";
import { AppDataSource } from "./data-source";

const server = Fastify();

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Database connected");

    server.get("/", async () => ({ message: "API OK" }));

    server.get("/users", async (request, reply) => {
      try {
        const userRepo = AppDataSource.getRepository("User");
        const users = await userRepo.find();
        reply.send(users);
      } catch (err) {
        reply.status(500).send({ error: "Internal Server Error" });
      }
    });

    server.post("/users", async (request, reply) => {
      const { name, email } = request.body as { name: string; email: string };

      if (!name || !email) {
        return reply.status(400).send({ error: "Name and email are required" });
      }

      try {
        const userRepo = AppDataSource.getRepository("User");
        const user = userRepo.create({ name, email });
        const savedUser = await userRepo.save(user);
        reply.code(201).send(savedUser);
      } catch (err: any) {
        if (err.code === "23505") {
          reply.status(409).send({ error: "Email already exists" });
        } else {
          reply
            .status(500)
            .send({ error: "Internal Server Error", detail: err.message });
        }
      }
    });

    return server.listen({ port: 3001 });
  })
  .then(() => console.log("🚀 Server running on http://localhost:3001"))
  .catch((err) => {
    console.error("❌ Failed to start:", err);
    process.exit(1);
  });
