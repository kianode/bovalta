import 'reflect-metadata';
import { AppDataSource } from '../../data-source';
import { seedUsers } from './seed_users';

(async () => {
  try {
    console.log('🚀 Running all seeders...');
    await AppDataSource.initialize();

    await seedUsers();

    await AppDataSource.destroy();
    console.log('🌱 All seeds completed');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeder failed:', err);
    process.exit(1);
  }
})();
