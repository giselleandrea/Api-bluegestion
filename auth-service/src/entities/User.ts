import { 
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, 
    ManyToOne, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn
} from "typeorm";
import { TypeUser } from "./TypeUser";
//import { Order } from "./Order";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    document: string;

    @Column()
    typeDocument: string;

    @ManyToOne(() => TypeUser, (typeUser) => typeUser.users)
    typeUser: TypeUser;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}