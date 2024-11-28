import { Product } from "../entities/Product";
import { Category } from "../entities/Category";

export class ProductService {
    // Crear un nuevo producto
    async createProduct(data: any) {
        const { 
            nameProduct, 
            referenceProduct, 
            amountProduct, 
            description, 
            stock, 
            categoryId 
        } = data;

        const existingProduct = await Product.findOne({ where: { nameProduct } });
        if (existingProduct) {
            return {
                success: false,
                message: 'El Producto ya está registrado',
            };
        }

        const category = await Category.findOne({ where: { id: categoryId } });
        if (!category) {
            throw new Error("Categoría no encontrada");
        }

        const newProduct = Product.create({
            nameProduct,
            referenceProduct,
            amountProduct,
            description,
            stock,
            category,
        });
        await newProduct.save();

        return {
            success: true,
            message: 'Producto creado exitosamente',
            data: newProduct
        };
    }

    // Actualizar un producto existente
    async updateProduct(data: any) {
        const { product_id, nameProduct, referenceProduct, amountProduct, description, stock, categoryId } = data;

        const existingProduct = await Product.findOne({ where: { id: product_id } });
        if (!existingProduct) {
            return { success: false, message: "El producto no existe", data: [] };

        }

        const category = await Category.findOne({ where: { id: categoryId } });
        if (!category) {
            return { success: false, message: "Categoría no encontrada", data: [] };
        }

        existingProduct.nameProduct = nameProduct;
        existingProduct.referenceProduct = referenceProduct;
        existingProduct.amountProduct = amountProduct;
        existingProduct.description = description;
        existingProduct.stock = stock;
        existingProduct.category = category;
        await existingProduct.save();

        return { success: true, message: "Productos encontrados", data: existingProduct };

    }

    // Obtener un producto por su ID
    async getProduct(productId: number) {
        const product = await Product.findOne({
            where: { id: productId },
            relations: ["category"],
        });
        if (!product) {
            return { success: false, message: "El producto no existe", data: [] };

        }
        return { success: true, message: "Productos encontrados", data: product };

    }

    // Obtener todos los productos
    async getProducts() {
        const products = await Product.find({ relations: ["category"] });
        if (products.length === 0) {
            return { success: false, message: "Productos no existen", data: [] };
        }
        return { success: true, message: "Productos encontrados", data: products };
    }

    // Obtener todas las categorías
    async getCategories() {
        const categories = await Category.find();

        if (categories.length === 0) {
            return { success: false, message: "Categoría no encontrada", data: [] };
        }
        return { success: true, message: "Categorias encontradas", data: categories };
    }
}
