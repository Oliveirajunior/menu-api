/**
 * Required External Modules and Interfaces
 */

import express, {Request, Response} from "express";
import * as ItemService from "./items.service";
import { Item } from "@prisma/client";

/**
 * Router Definition
 */

export const itemsRouter = express.Router();

/**
 * Controller Definitions
 */

// GET items

itemsRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const items: Item[] = await ItemService.findAll();

    return res.status(200).json(items);

  } catch (error: any) {
    return res.status(500).send(error.message);
  }
});

// GET items/:id

itemsRouter.get('/:id', async (req: Request, res: Response) => {

  try {
    const id: number = parseInt(req.params.id, 10);
    const item: Item|null = await ItemService.find(id);

    if(item) {
      return res.status(200).json(item);
    }

    return res.status(404).send("item not found");

  } catch (error: any) {
    return res.status(500).send(error.message);
  }
});

// POST items

itemsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const {name, price, description, image} = req.body;

    const newItem: Item = await ItemService.create(name, price, description, image);

    return res.status(201).json(newItem);

  } catch (error: any) {
    return res.status(500).send(error.message);
  }
});

// PUT items/:id

itemsRouter.put('/:id', async(req: Request, res: Response) => {

  try {
    const id: number = parseInt(req.params.id, 10);
    const {name, price, description, image} = req.body;

    const existingItem: Item|null = await ItemService.find(id);

    if(existingItem) {
      const updatedItem = await ItemService.update(id, name, price, description, image);
      return res.status(200).json(updatedItem);
    }

    return res.status(404).send("item not found");

  } catch (error: any) {
    return res.status(500).send(error.message);
  }

});


// DELETE items/:id

itemsRouter.delete("/:id", async(req: Request, res: Response) => {

  try {
    const id: number = parseInt(req.params.id, 10)

    const existingItem: Item|null = await ItemService.find(id);

    if(existingItem) {
      await ItemService.remove(id);
      return res.sendStatus(204);
    }

    return res.status(404).send("item not found");

  } catch (error: any) {
    return res.status(500).send(error.message);
  }
})