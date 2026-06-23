import { Request, Response } from "express";
import { WharehouseService } from "./warehouse.service";
import { CreateWarehouseDto } from "./dtos/create-warehouse.dto";
import { UpdatePWarehouseDto } from "./dtos/update-warehouse.dto";
import { PaginationDto } from "../common/dtos/pagination/pagination.dto";

export class WarehouseController {
    constructor(
        private readonly wharehouseService: WharehouseService
    ) { }

    create = (req: Request, res: Response) => {
        const [error, createWarehouseDto] = CreateWarehouseDto.validate(req.body);
        if (error) {
            res.status(400).json({ message: error, status: 400 });
            return;
        }

        this.wharehouseService.create(createWarehouseDto!)
            .then((product) => res.status(201).json(product))
            .catch((error) => res.status(500).json({ error: error.message }));
    }

    update = (req: Request, res: Response) => {
        const [error, updatePWarehouseDto] = UpdatePWarehouseDto.validate(req.body);
        if (error) {
            res.status(400).json({ message: error, status: 400 });
            return;
        }

        this.wharehouseService.update(req.params.id as string, updatePWarehouseDto!)
            .then((product) => res.status(200).json(product))
            .catch((error) => res.status(500).json({ error: error.message }));
    }

    findAll = (req: Request, res: Response) => {
        const [error, paginationDto] = PaginationDto.validate(req.query);
        if (error) {
            res.status(400).json({ message: error, status: 400 });
            return;
        }
        this.wharehouseService.findAll(paginationDto!)
            .then((products) => res.status(200).json(products))
            .catch((error) => res.status(500).json({ error: error.message }));
    }

    findOne = (req: Request, res: Response) => {

        this.wharehouseService.findOne(req.params.id as string)
            .then((product) => res.status(200).json(product))
            .catch((error) => res.status(500).json({ error: error.message }));
    }

    delete = (req: Request, res: Response) => {

        this.wharehouseService.delete(req.params.id as string)
            .then((product) => res.status(200).json(product))
            .catch((error) => res.status(500).json({ error: error.message }));
    }
}
