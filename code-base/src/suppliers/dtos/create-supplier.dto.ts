

export class CreateSupplierDto {
    constructor(
        public name: string,
        public email: string,
        public phone: string,
        public address: string | undefined,
    ){}

    static validate(data: {[key: string]:any}): [string | undefined, CreateSupplierDto | undefined]{
        const { name, email, phone, address } = data;

        if(!name) return ["Missing name", undefined];
        if (name && name.length < 2) return ["Name too short", undefined];

        if(!email) return ["Missing email", undefined];

        if(!phone) return ["Missing phone", undefined];
        if(phone && phone.length < 5) return ["Phone too short", undefined];
        if(!/^\+?[0-9\s\-\(\)]+$/.test(phone)) return ["Phone format not valid", undefined];

        if(address && address.length < 5) return ["Address too short", undefined];
        
        return [undefined, new CreateSupplierDto(name, email, phone, address)];
    }
}