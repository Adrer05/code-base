import { Product } from "../common/databases/mongodb/models/product.model";
import { PaginationDto } from "../common/dtos/pagination/pagination.dto";
import { CreateWarehouseDto } from "./dtos/create-warehouse.dto";
import { UpdatePWarehouseDto } from "./dtos/update-warehouse.dto";
import { Warehouse } from "./warehouse.model";
import mongoose from "mongoose";

export class WharehouseService {
    async create(createWarehouseDto: CreateWarehouseDto) {
        try {
            if (createWarehouseDto.products.length > 0) {
                for (const productId of createWarehouseDto.products) {
                    const product = await Product.findById(productId);
                    if (!product) throw new Error(`Product with id #${productId} not found`);
                }
            }

            const warehouseData = {
                ...createWarehouseDto,
                products: createWarehouseDto.products.map(id => new mongoose.Types.ObjectId(id))
            };

            const warehouse = await Warehouse.create(warehouseData);
            if (!warehouse) throw new Error("Failed to create Warehouse");

            return warehouse;
        } catch (error) {
            throw error;
        }
    }

    async findAll(paginationDto: PaginationDto) {
        try {
            const { page, limit } = paginationDto;
            const skip = (page - 1) * limit;

            const warehouses = await Warehouse.find({ isActive: true })
                .skip(skip)
                .limit(limit)
                .populate("products");
            const total = await Warehouse.countDocuments({ isActive: true });
            return {
                data: warehouses,
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

    async update(id: string, updatePWarehouseDto: UpdatePWarehouseDto) {
        try {
            if (updatePWarehouseDto.products && updatePWarehouseDto.products.length > 0) {
                for (const productId of updatePWarehouseDto.products) {
                    const product = await Product.findById(productId);
                    if (!product) throw new Error(`Product with id #${productId} not found`);
                }
            }

            const warehouseData = {
                ...updatePWarehouseDto,
                products: updatePWarehouseDto.products.map(id => new mongoose.Types.ObjectId(id))
            };

            const warehouse = await Warehouse.findOneAndUpdate({ _id: id }, warehouseData, { new: true }); 
            if (!warehouse) throw new Error("Warehouse not found");

            return warehouse;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: string) {
        try {
            const warehouse = await Warehouse.findOneAndUpdate(
                { _id: id },
                { isActive: false },
                { new: true }
            );
            if (!warehouse) throw new Error("Warehouse not found");

            return warehouse;
        } catch (error) {
            throw error;
        }
    }

    async findOne(id: string) {
        try {
            const warehouse = await Warehouse.findOne({ _id: id, isActive: true })
                .populate({
                    path: "products",
                    populate: [
                        { path: "category" },
                        { path: "supplier" }
                    ]
                });
            if (!warehouse) throw new Error("Warehouse not found");

            return warehouse;
        } catch (error) {
            throw error;
        }
    }
}