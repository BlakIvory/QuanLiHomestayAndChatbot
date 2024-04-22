const { ObjectId } = require("mongodb");
class SectorService {
  constructor(client) {
    this.Sector = client.db().collection("sectors");
  }

  extractSectorData(payload) {
    const sector = {
      nameSector: payload.nameSector,
      discSector: payload.discSector,
      addressSector: payload.addressSector,
      totalRoomInSector: payload.totalRoomInSector,
      statusSector: payload.statusSector,
    };
    Object.keys(sector).forEach(
      (key) => sector[key] === undefined && delete sector[key]
    );
    return sector;
  }

  async check(filter) {
    // console.log(filter);
    const cursor = await this.Sector.find(filter);
    return await cursor.toArray();
  }

  async checkByIdSector(filter) {
    // console.log(filter);
    const cursor = await this.Sector.find({
      _id: ObjectId.isValid(filter.idSector)
        ? new ObjectId(filter.idSector)
        : null,
    });
    return await cursor.toArray();
  }

  async addSector(payload) {
    console.log(payload);
    const sector = await this.extractSectorData(payload);
    const result = await this.Sector.findOneAndUpdate(
      sector,
      { $set: { totalRoomInSector: 0, statusSector: 0 } },
      { returnDocument: "after", upsert: true }
    );
    console.log(result);
    return result;
  }
  async addOneRoomInSector(payload) {
    // console.log(payload);

    const result = await this.Sector.findOneAndUpdate(
      {
        _id: ObjectId.isValid(payload.idSector)
          ? new ObjectId(payload.idSector)
          : null,
      },
      { $inc: { totalRoomInSector: 1 }},
      { returnDocument: "after", upsert: true }
    );
    console.log(result);
    return result;
  }
}

module.exports = SectorService;
