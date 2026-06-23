import { Category } from "../common/databases/mongodb/models/category.model";
import { Product } from "../common/databases/mongodb/models/product.model";
import { PaginationDto } from "../common/dtos/pagination/pagination.dto";
import { CreateProductDto } from "./dtos/create-product.dto";
import { UpdateProductDto } from "./dtos/update-product.dto";
import { Supplier } from "../suppliers/supplier.model";

export class ProductsService {
    async create(createProductDto: CreateProductDto) {
        try {
            const category = await Category.findById(createProductDto.category);
            if (!category) throw new Error(`Category with id #${createProductDto.category} not found`);
    
            const supplier = await Supplier.findById(createProductDto.supplier);
            if (!supplier) throw new Error(`Supplier with id #${createProductDto.supplier} not found`);
    
            const product = await Product.create(createProductDto);
            if (!product) throw new Error("Failed to create product");
    
            return product;
        } catch (error) {
            throw error;
        }
    }

    async findAll(paginationDto: PaginationDto) {
        try {
            const { page, limit } = paginationDto;
            const skip = (page - 1) * limit;

            const products = await Product.find({ isActive: true })
            .skip(skip)
            .limit(limit)
            .populate("supplier")
            .populate("category");
            const total = await Product.countDocuments({ isActive: true });
            return {
                data: products,
                meta: {
                    page,
                    limit,
                    total,
                    lastPage: Math.ceil(total / limit),
                }
            };
        } catch (error) {
            throw error;
        }
    }

    async update(id: string, updateProductDto: UpdateProductDto) {
        try {
            if (updateProductDto.category) {
                const category = await Category.findById(updateProductDto.category);
                if (!category) throw new Error(`Category with id #${updateProductDto.category} not found`);
            }
    
            if (updateProductDto.supplier) {
                const supplier = await Supplier.findById(updateProductDto.supplier);
                if (!supplier) throw new Error(`Supplier with id #${updateProductDto.supplier} not found`);
            }
    
            const product = await Product.findOneAndUpdate({ _id: id }, updateProductDto, { new: true });
            if (!product) throw new Error("Product not found");
    
            return product;
        } catch (error) {
            throw error;
        }
    }
    
    async delete(id: string) {
        try {
            const product = await Product.findOneAndUpdate(
                { _id: id },
                { isActive: false },
                { new: true }
            );
            if (!product) throw new Error("Product not found");
    
            return product;
        } catch (error) {
            throw error;
        }
    }

    async findOne(id: string) {
        try {
            const product = await Product.findOne({ _id: id, isActive: true }).populate("supplier").populate("category");
            if (!product) throw new Error("Product not found");

            return product;
        } catch (error) {
            throw error;
        }
    }
}