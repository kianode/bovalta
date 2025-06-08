import { FastifyInstance } from 'fastify';
import { AppDataSource } from '../config/typeorm.config';
import { User } from '../entities/user.entity';

export async function usersRoutes(server: FastifyInstance) {
  console.log('📨 Registering /api/users route');
  server.get('/api/users', async (request, reply) => {
    const users = await AppDataSource.getRepository(User).find();
    reply.send(users);
  });
}
