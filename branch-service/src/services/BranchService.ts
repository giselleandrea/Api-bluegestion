import { Branch } from "../entities/Branch";

export class BranchService {
    async createBranch(data: any) {
        const { 
            nameBranch, 
            phoneBranch, 
            neighborhoodBranch, 
            address, 
            nameContact 
        } = data;

        // Verificar si la sucursal ya existe
        const existingBranch = await Branch.findOne({
            where: { nameBranch }
        });

        if (existingBranch) {
            return {
                success: false,
                message: 'La sucursal ya está registrada'
            };
        }

        const newBranch = new Branch();
        newBranch.nameBranch = nameBranch;
        newBranch.phoneBranch = phoneBranch;
        newBranch.neighborhoodBranch = neighborhoodBranch;
        newBranch.address = address;
        newBranch.nameContact = nameContact;
        await newBranch.save();

        return newBranch;
        
    }

    async getBranch(branchId: number) {
        const existingBranch = await Branch.findOne({
            where: { id: branchId }
        });

        if (!existingBranch) {
            return { success: false, message: "No hay sucursales disponibles", data: [] };
        }
        return { success: true, message: "Sucursales encontradas", data: existingBranch };
    }

    async getBranches() {
        const allBranches = await Branch.find();

        if (allBranches.length === 0) {
            return { success: false, message: "No hay sucursales disponibles", data: [] };
        }
        return { success: true, message: "Sucursales encontradas", data: allBranches };
    }
}