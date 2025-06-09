import { FastifyInstance } from "fastify";
import { AppDataSource } from "../config/typeorm.config";
import { User } from "../entities/user.entity";

export async function usersRoutes(server: FastifyInstance) {
  console.log("📨 Registering /api/users route");

  // GET /api/users
  server.get("/api/users", async (request, reply) => {
    const users = await AppDataSource.getRepository(User).find();
    reply.send(users);
  });

  // POST /api/users
  server.post("/api/users", async (request, reply) => {
    const { firstName, lastName, email, telNumber, role } =
      request.body as Partial<User>;

    if (!firstName || !lastName || !email || !telNumber || !role) {
      return reply.status(400).send({ error: "All fields are required" });
    }

    try {
      const repo = AppDataSource.getRepository(User);
      const user = repo.create({ firstName, lastName, email, telNumber, role });
      const saved = await repo.save(user);
      reply.status(201).send(saved);
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
}
