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
import { OrderProduct } from "../entities/OrderProduct";
import { Customer } from "../../../customer-service/src/entities/Customer";

@Entity()
export class Order extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    referenceOrder: string;

    @Column()
    statusOrder: string;

    @Column()
    totalAmount: number;

    @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
    orderProducts: OrderProduct[];

    @ManyToOne(() => Customer, (customer) => customer.orders)
    customer: Customer;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}