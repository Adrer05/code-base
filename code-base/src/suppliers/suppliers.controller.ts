import { Request, Response } from "express";
import { SuppliersService } from "./suppliers.service";
import { CreateSupplierDto } from "./dtos/create-supplier.dto"; 
import { UpdateSupplierDto } from "./dtos/update-supplier.dto";
import { PaginationDto } from "../common/dtos/pagination/pagination.dto";

export class SuppliersController {
    constructor(
        private readonly suppliersService: SuppliersService
    ) { }

    create = (req: Request, res: Response) => {
        const [error, createSupplierDto] = CreateSupplierDto.validate(req.body);
        if (error) {
            res.status(400).json({ message: error, status: 400 });
            return;
        }

        this.suppliersService.create(createSupplierDto!)
            .then((product) => res.status(201).json(product))
            .catch((error) => res.status(500).json({ error: error.message }));
    }

    update = (req: Request, res: Response) => {
        const [error, updateSupplierDto] = UpdateSupplierDto.validate(req.body);
        if (error) {
            res.status(400).json({ message: error, status: 400 });
            return;
        }

        this.suppliersService.update(req.params.id as string, updateSupplierDto!)
            .then((product) => res.status(200).json(product))
            .catch((error) => res.status(500).json({ error: error.message }));
    }

    findAll = (req: Request, res: Response) => {
        const [error, paginationDto] = PaginationDto.validate(req.query);
        if (error) {
            res.status(400).json({ message: error, status: 400 });
            return;
        }
        this.suppliersService.findAll(paginationDto!)
            .then((products) => res.status(200).json(products))
            .catch((error) => res.status(500).json({ error: error.message }));
    }

    findOne = (req: Request, res: Response) => {

        this.suppliersService.findOne(req.params.id as string)
            .then((product) => res.status(200).json(product))
            .catch((error) => res.status(500).json({ error: error.message }));
    }

    delete = (req: Request, res: Response) => {

        this.suppliersService.delete(req.params.id as string)
            .then((product) => res.status(200).json(product))
            .catch((error) => res.status(500).json({ error: error.message }));
    }
}
