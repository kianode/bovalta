import { AppDataSource } from '../../data-source';
import { User } from '../../entities/user.entity';

export async function seedUsers() {
  const userRepo = AppDataSource.getRepository(User);

  await userRepo.clear(); // Töm tabellen först för att undvika dubbletter

  const users = [
    { firstName: 'Anna', lastName: 'Lind', email: 'anna@example.com', telNumber: '070-1234567', role: 'Ordförande' },
    { firstName: 'Björn', lastName: 'Svensson', email: 'bjorn@example.com', telNumber: '070-2345678', role: 'Suppleant' },
    { firstName: 'Carina', lastName: 'Eriksson', email: 'carina@example.com', telNumber: '070-3456789', role: 'Ledamot' },
    { firstName: 'David', lastName: 'Karlsson', email: 'david@example.com', telNumber: '070-4567890', role: 'Ledamot' },
    { firstName: 'Eva', lastName: 'Nilsson', email: 'eva@example.com', telNumber: '070-5678901', role: 'Revisor' },
    { firstName: 'Fredrik', lastName: 'Johansson', email: 'fredrik@example.com', telNumber: '070-6789012', role: 'Valberedning' },
    { firstName: 'Gunnar', lastName: 'Andersson', email: 'gunnar@example.com', telNumber: '070-7890123', role: 'Medlem' },
    { firstName: 'Hanna', lastName: 'Berg', email: 'hanna@example.com', telNumber: '070-8901234', role: 'Medlem' },
    { firstName: 'Isak', lastName: 'Dahl', email: 'isak@example.com', telNumber: '070-9012345', role: 'Medlem' },
    { firstName: 'Julia', lastName: 'Eklund', email: 'julia@example.com', telNumber: '070-0123456', role: 'Medlem' },
  ];

  await userRepo.save(users);
  console.log('👤 Users seeded');
}
