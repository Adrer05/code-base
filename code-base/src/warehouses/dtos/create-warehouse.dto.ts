import { ValidatorsConfig } from "../../common/config/validators.config";

export class CreateWarehouseDto {
    constructor(
        public name: string,
        public textLocation: string,
        public products: string[],
    ){}

    static validate(data: {[key: string]:any}): [string | undefined, CreateWarehouseDto | undefined]{
        const { name, textLocation, products = []} = data;

        if(!name) return ["Missing name", undefined];
        if (name && name.length < 2) return ["Name too short", undefined];

        if(!textLocation) return ["Missing Location", undefined];
        if(textLocation && textLocation.length < 4) return ["Location too short", undefined];
        
        if(products.length > 0){
            const allValid = products.every((id: string) => ValidatorsConfig.isMongoId(id));
            if(!allValid) return ["One or more product IDs are not valid", undefined];
        }        
        return [undefined, new CreateWarehouseDto(name, textLocation, products)];
    }
}