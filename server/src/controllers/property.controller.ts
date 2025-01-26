import { Request, Response } from "express";
import { TypedRequest } from "../configs/requests";
import { propertySchema, unitSchema, unitUpdateSchema } from "../configs/zod";
import db from "../configs/db";
import { PropertyType, UnitType, UnitUpdateType } from "../configs/types";
import { AppError, ERROR_CODES } from "../utils/errors";

export const addProperty = async (req: Request, res: Response) => {
  //validate the user input
  const zodResponse = propertySchema.safeParse(req.body);
  if (zodResponse.error) throw zodResponse.error;

  //get the ownerId from req
  const owner = (req as TypedRequest<{}, PropertyType>).user;
  if (!owner) throw new AppError(ERROR_CODES.USER_NOT_FOUND, "User not found");

  //create the property if not existing
  const property = await db.property.create({
    data: {
      name: zodResponse.data.name,
      address: zodResponse.data.address,
      type: zodResponse.data.type,
      ownerId: owner.id,
      country: zodResponse.data.country,
      state: zodResponse.data.state,
    },
  });

  //return newly created property
  res.status(200).json({
    success: true,
    message: "Property created successfully",
    data: property,
  });
};

export const getOwnerProperties = async (req: Request, res: Response) => {
  const owner = (req as TypedRequest<{}, PropertyType>).user;
  if (!owner) throw new AppError(ERROR_CODES.USER_NOT_FOUND, "User not found");
  const properties = await db.property.findMany({
    where: {
      ownerId: owner.id,
    },
    include: {
      units: true,
    },
  });
  res.status(200).json({
    success: true,
    message: "Properties fetched successfully",
    data: properties,
  });
};

export const getProperties = async (req: Request, res: Response) => {
  const properties = await db.property.findMany({
    include: {
      units: true,
    },
  });
  res.status(200).json({
    success: true,
    message: "Properties fetched successfully",
    data: properties,
  });
};

export const deleteProperty = async (req: Request, res: Response) => {
  const request = req as TypedRequest<{ propertyId: string }>;
  const params = request.params;
  const owner = request.user;

  if (!owner)
    throw new AppError(ERROR_CODES.VALIDATION_UNAUTHENTICATED, "Unauthorized");

  const property = await db.property.findFirst({
    where: {
      id: params.propertyId,
      ownerId: owner.id,
    },
  });

  if (!property)
    throw new AppError(
      ERROR_CODES.USER_NOT_AUTHORIZED,
      "Unauthorized, Only owner can delete this property "
    );

  await db.property.delete({
    where: {
      id: property.id,
    },
  });

  res.status(200).json({
    success: true,
    message: "Property deleted successfully",
  });
};

export const updateProperty = async (req: Request, res: Response) => {
  const request = req as TypedRequest<{ propertyId: string }>;
  const params = request.params;
  const owner = request.user;

  if (!owner)
    throw new AppError(ERROR_CODES.VALIDATION_UNAUTHENTICATED, "Unauthorized");

  const zodResponse = propertySchema.safeParse(req.body);
  if (zodResponse.error) throw zodResponse.error;

  const property = await db.property.findFirst({
    where: {
      id: params.propertyId,
      ownerId: owner.id,
    },
  });

  if (!property)
    throw new AppError(
      ERROR_CODES.VALIDATION_UNAUTHORIZED,
      "Unauthorized, Only owner can update this property "
    );

  await db.property.update({
    data: {
      ...zodResponse.data,
    },
    where: {
      id: property.id,
    },
  });

  res.status(200).json({
    success: true,
    message: "Property updated successfully",
  });
};

export const updateUnitAvailability = async (req: Request, res: Response) => {
  const request = req as TypedRequest<
    { unitId: string },
    { availability: "AVAILABLE" | "RENTED" }
  >;
  const params = request.params;
  const owner = request.user;

  if (!owner || owner.role !== "admin")
    throw new AppError(ERROR_CODES.VALIDATION_UNAUTHENTICATED, "Unauthorized");
  if (owner.role == "admin") {
    await db.unit.update({
      data: {
        availability: request.body.availability,
      },
      where: {
        id: params.unitId,
      },
    });
  } else {
    await db.unit.update({
      data: {
        availability: request.body.availability,
      },
      where: {
        id: params.unitId,
        property: {
          ownerId: owner.id,
        },
      },
    });
  }

  res.status(200).json({
    success: true,
    message: "Unit updated successfully",
  });
};

export const addUnit = async (req: Request, res: Response) => {
  const zodResponse = unitSchema.safeParse(req.body);
  const params = (req as TypedRequest<{ propertyId: string }>).params;
  const propertyId = params.propertyId;
  if (zodResponse.error) throw zodResponse.error;

  const property = await db.property.findUnique({
    where: {
      id: propertyId,
    },
  });
  if (!property)
    throw new AppError(ERROR_CODES.PROPERTY_NOT_FOUND, "Property not found");

  await db.unit.create({
    data: {
      ...zodResponse.data,
      property: {
        connect: {
          id: propertyId,
        },
      },
    },
  });

  res.status(201).json({
    success: true,
    message: "Unit created successfully",
  });
};

export const updateUnit = async (req: Request, res: Response) => {
  const request = req as TypedRequest<{ unitId: string }, UnitUpdateType>;
  const params = request.params;
  const owner = request.user;

  if (!owner)
    throw new AppError(ERROR_CODES.VALIDATION_UNAUTHENTICATED, "Unauthorized");

  const zodResponse = unitUpdateSchema.safeParse(request.body);
  if (zodResponse.error) throw zodResponse.error;

  const unit = await db.unit.findFirst({
    where: {
      id: params.unitId,
      property: {
        ownerId: owner.id,
      },
    },
  });

  if (!unit){
    throw new AppError(
        ERROR_CODES.VALIDATION_UNAUTHORIZED,
        "Unauthorized, Only owner can update this unit"
      );
  }

  await db.unit.update({
    data: {
      ...zodResponse.data,
    },
    where: {
      id: unit.id,
    },
  });

  res.status(200).json({
    success: true,
    message: "Unit updated successfully!",
  });
};

export const deleteUnit = async (req: Request, res: Response) => {
  const request = req as TypedRequest<{ unitId: string }>;
  const params = request.params;
  const owner = request.user;

  if (!owner || owner.role !== "admin")
    throw new AppError(ERROR_CODES.VALIDATION_UNAUTHENTICATED, "Unauthorized");

  if (owner.role == "admin") {
    await db.unit.delete({
      where: {
        id: params.unitId,
      },
    });
  } else {
    const unit = await db.unit.findFirst({
      where: {
        id: params.unitId,
        property: {
          ownerId: owner.id,
        },
      },
    });

    if (!unit)
      throw new AppError(
        ERROR_CODES.VALIDATION_UNAUTHORIZED,
        "Unauthorized, Only owner can delete this unit"
      );
    await db.unit.delete({
      where: {
        id: unit.id,
      },
    });
  }

  res.status(200).json({
    success: true,
    message: "Unit deleted successfully",
  });
};

export const getUnit = async (req: Request, res: Response) => {
  const request = req as TypedRequest<{ unitId: string }>;
  const params = request.params;

  const unit = await db.unit.findFirst({
    where: {
      id: params.unitId,
    },
  });

  if (!unit)
    throw new AppError(ERROR_CODES.DB_RECORD_NOT_FOUND, "Could not find unit");

  res.status(200).json({
    success: true,
    data: unit,
  });
};
