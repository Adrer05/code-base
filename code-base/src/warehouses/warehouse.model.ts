import mongoose, { Schema } from "mongoose";

export interface IWarehouse extends Document {
    name: string;
    textLocation: string;
    products: mongoose.Types.ObjectId[];
    isActive: boolean;
}

const warehouseSchema = new Schema<IWarehouse>({
    name: {
        type: String,
        required: [true, "Name is required"],
        unique: true,
    },
    textLocation: {
        type: String,
        required: [true, "Location is required"],
    },
    products: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
        default: []
    },
    isActive: {
        type: Boolean,
        default: true
    }
    
},
    {
        timestamps: true
    }
);

// delete __v and change _id to id
warehouseSchema.set("toJSON", {
    versionKey: false,
    virtuals: false,
    transform: (doc, ret: Record<string, any>) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

export const Warehouse = mongoose.model<IWarehouse>("Warehouse", warehouseSchema);