import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  role!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  telNumber!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}
