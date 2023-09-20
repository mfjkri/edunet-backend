import Centre from "../models/centre";

async function createCentre(name: string): Promise<Centre> {
  try {
    const centre = await Centre.create({
      name: name,
    });
    return centre;
  } catch (error: any) {
    throw new Error(`Error creating centre: ${error}`);
  }
}

async function deleteCentreById(id: number): Promise<boolean> {
  try {
    const deletedCount = await Centre.destroy({
      where: {
        id: id,
      },
    });
    return deletedCount > 0;
  } catch (error: any) {
    throw new Error(`Error deleting centre: ${error}`);
  }
}

async function editCentreById(id: number, newName: string): Promise<Centre> {
  try {
    const centre = await Centre.findByPk(id);

    if (!centre) {
      throw new Error(`Centre with ID ${id} not found`);
    }

    if (newName) {
      centre.name = newName;
    }

    await centre.save();
    await centre.reload();

    return centre;
  } catch (error: any) {
    throw new Error(`Error editing centre: ${error}`);
  }
}

async function getCentreById(id: number): Promise<Centre> {
  try {
    const centre = await Centre.findOne({
      where: {
        id: id,
      },
    });

    if (!centre) {
      throw new Error(`Centre with ID ${id} not found`);
    }

    return centre;
  } catch (error: any) {
    throw new Error(`Error getting centre: ${error}`);
  }
}

async function getAllCentres(): Promise<Centre[]> {
  try {
    const centres = await Centre.findAll();
    return centres;
  } catch (error: any) {
    throw new Error(`Error getting centres: ${error}`);
  }
}

export {
  createCentre,
  deleteCentreById,
  editCentreById,
  getCentreById,
  getAllCentres,
};
