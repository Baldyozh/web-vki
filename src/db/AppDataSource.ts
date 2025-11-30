import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Group } from './entity/Group.entity';
import { Student } from './entity/Student.entity';
import { User } from './entity/User.entity';
import { hashPassword } from '@/utils/password';
const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DB ?? './db/vki-web.db', // Path to your SQLite database file
  entities: [Group, Student, User],
  synchronize: true, // Auto-create schema on startup (use with caution in production)
  logging: false,
});

// Ленивая инициализация для Next.js
let isInitialized = false;
let initializationPromise: Promise<void> | null = null;

const ensureInitialized = async (): Promise<void> => {
  if (isInitialized) {
    return;
  }

  if (initializationPromise) {
    return initializationPromise;
  }

  initializationPromise = AppDataSource.initialize()
    .then(() => {
      isInitialized = true;
      console.log('Data Source has been initialized!');
      console.log('Database path:', process.env.DB ?? './db/vki-web.db');
    })
    .catch((err) => {
      isInitialized = false;
      initializationPromise = null;
      console.error('Error during Data Source initialization:', err);
      throw err;
    });

  return initializationPromise;
};

// Инициализация при первом импорте модуля
ensureInitialized().catch((err) => {
  console.error('Failed to initialize Data Source on module load:', err);
});
const ensureSeedUsers = async (): Promise<void> => {
  const repository = AppDataSource.getRepository(User);
  const defaultUsers = [
    {
      email: 'admin@example.com',
      fullName: 'Администратор Системы',
      password: hashPassword('admin123'),
    },
    {
      email: 'manager@example.com',
      fullName: 'Менеджер Учебного Отдела',
      password: hashPassword('manager123'),
    },
  ];

  await Promise.all(defaultUsers.map(async (user) => {
    const exists = await repository.findOne({
      where: { email: user.email },
    });

    if (!exists) {
      await repository.save(repository.create(user));
    }
  }));
};
await ensureSeedUsers();
export default AppDataSource;
export { ensureInitialized };
