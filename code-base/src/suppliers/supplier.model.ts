import mongoose, { Schema } from "mongoose";
const validator = require('validator');

export interface ISupplier extends Document {
    name: string;
    email: string;
    phone: string;
    address: string | undefined;
    isActive: boolean;
}

const supplierSchema = new Schema<ISupplier>({
    name: {
        type: String,
        required: [true, "Name is required"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: validator.isEmail,
            message: 'El formato del correo electrónico no es válido'
        }
    },
    phone: {
        type: String,
        required: [true, "phone is required"]
    },
    address: {
        type: String,
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
supplierSchema.set("toJSON", {
    versionKey: false,
    virtuals: false,
    transform: (doc, ret: Record<string, any>) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

export const Supplier = mongoose.model<ISupplier>("Supplier", supplierSchema);