import { Column, Entity, PrimaryColumn, VersionColumn } from 'typeorm';

@Entity({
  name: 'user',
})
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @VersionColumn({ type: 'int' })
  version: number;
}
