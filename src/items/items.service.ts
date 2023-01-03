/**
 * Data Model Interfaces
 */

import { Item, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

/**
 * Service Methods
 */

export const findAll = async (): Promise<Item[]> => {
  return await prisma.item.findMany()
};

export const find = async (id:number): Promise<Item|null> => {
  return await prisma.item.findUnique({where: {id}})
};

export const create = async (
  name:string,
  price:number,
  description:string,
  image:string
  ): Promise<Item> => {
  return await prisma.item.create({data: {
    name,
    price,
    description,
    image
  }})
};

export const update = async (
  id: number,
  name:string,
  price:number,
  description:string,
  image:string
): Promise<Item> => {
  
  return await prisma.item.update({
    data: {
      name,
      price,
      description,
      image
    },
    where: {id}
  });

};

export const remove = async(id: number): Promise<Item> => {

  return await prisma.item.delete({where: {id}});

};