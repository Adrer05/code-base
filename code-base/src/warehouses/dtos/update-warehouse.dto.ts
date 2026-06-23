import { ValidatorsConfig } from "../../common/config/validators.config";

export class UpdatePWarehouseDto {
    constructor(
        public name: string | undefined,
        public textLocation: string | undefined,
        public products: string[],
    ) { }

    set fields(data: Partial<UpdatePWarehouseDto>) {
        const { name, textLocation, products=[] } = data;

        if (name) this.name = name;
        if (textLocation) this.textLocation = textLocation;
        if (products) this.products = products;
    }

    static validate(data: { [key: string]: any }): [string | undefined, UpdatePWarehouseDto | undefined] {
        const { name, textLocation, products } = data;

        if (name && name.length < 2) return ["Name too short", undefined];
        
        if(textLocation && textLocation.length < 4) return ["Location too short", undefined];

        if (products.length > 0) {
            const allValid = products.every((id: string) => ValidatorsConfig.isMongoId(id));
            if (!allValid) return ["One or more product IDs are not valid", undefined];
        }

        return [undefined, new UpdatePWarehouseDto(name, textLocation, products)];
    }
}