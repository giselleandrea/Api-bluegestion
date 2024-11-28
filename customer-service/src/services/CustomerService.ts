import { Customer } from "../entities/Customer";

export class CustomerService {
    async createCustomer(data: any) {
        const {
            nameCustomer,
            phoneCustomer,
            neighborhoodCustomer,
            address,
            email,
            branchId
        } = data;

        // Verificar si el cliente ya existe
        const existingCustomer = await Customer.findOne({
            where: { nameCustomer }
        });
        if (existingCustomer) {
            return {
                success: false,
                message: 'El Cliente ya está registrado',
            };
        }

        // Crear el nuevo cliente
        const newCustomer = new Customer();
        newCustomer.nameCustomer = nameCustomer;
        newCustomer.phoneCustomer = phoneCustomer;
        newCustomer.neighborhoodCustomer = neighborhoodCustomer;
        newCustomer.address = address;
        newCustomer.email = email;
        newCustomer.branch = branchId;
        await newCustomer.save();

        return {
            success: true,
            message: 'Cliente creado exitosamente',
            data: newCustomer
        };
    }

    async getCustomer(customer_id: number) {
        const existingCustomer = await Customer.findOne({
            where: {id: customer_id}
        });
        if (!existingCustomer) {
            return { success: false, message: "No hay Customers disponibles", data: [] };
        }
        return { success: true, message: "Customer encontradas", data: existingCustomer };
    }

    async getCustomers() {
        const allCustomers = await Customer.find({ 
            relations: ['branch'] 
        }); 
        if (allCustomers.length === 0) {
            return { success: false, message: "No hay Customers disponibles", data: [] };
        }
        return { success: true, message: "Customer encontrados", data: allCustomers };
    }

}