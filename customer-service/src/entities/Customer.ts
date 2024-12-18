import { 
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, 
    ManyToOne, 
    OneToMany, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn
} from "typeorm";
import { Branch } from "../../../branch-service/src/entities/Branch";
import { Order } from "../../../order-service/src/entities/Order";

@Entity()
export class Customer extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nameCustomer: string;

    @Column()
    phoneCustomer: string;

    @Column()
    neighborhoodCustomer: string;

    @Column()
    address: string;

    @Column()
    email:string;

    @ManyToOne(() => Branch, (branch) => branch.customers)
    branch: Branch;

    @OneToMany(() => Order, (order) => order.customer)
    orders: Order[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}