
export class UpdateSupplierDto {
    constructor(
        public name: string,
        public email: string,
        public phone: string,
        public address: string,
    ){}

    
    set fields(data: Partial<UpdateSupplierDto>) {
        const { name, email, phone, address } = data;

        if (name) this.name = name;
        if (email) this.email = email;
        if (phone) this.phone = phone;
        if (address) this.address = address;
    }
    
    static validate(data: { [key: string]: any }): [string | undefined, UpdateSupplierDto | undefined] {
        const { name, email, phone, address } = data;

        if (phone && phone.length < 4) return ["Phone too short", undefined];
        if(!/^\+?[0-9\s\-\(\)]+$/.test(phone)) return ["Phone format not valid", undefined];

        if(address && address.length < 5) return ["Address too short", undefined];
        
        return [undefined, new UpdateSupplierDto(name, email, phone, address)];
    }



}