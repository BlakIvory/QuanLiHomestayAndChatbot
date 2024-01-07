class SectorService {
    constructor(client) {
        this.Sector = client.db().collection("sectors");
    }

    extractSectorData(payload) {
        const sector = {
            nameSector: payload.nameSector,
            discSector: payload.discSector,
            noteSector: payload.noteSector,
            imgSector : payload.imgSector,
            room: payload.room,
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

    async addSectorService(payload) {
        //   console.log(payload)
        const setor = await this.extractSectorData(payload);
        const result = await this.Sector.findOneAndUpdate(
            setor,
            { $set: { noteSector: '', room: {} } },
            { returnDocument: "after", upsert: true }
        );
        return result;
    }




    async addRoomToSectorService(payload) {
          console.log(payload)
        const setor = await this.extractSectorData(payload);
        const result = await this.Sector.findOneAndUpdate(
            setor,
            { $push: { noteSector: '', room: {} } },
            { returnDocument: "after", upsert: true }
        );
        return result;
    }


}

module.exports = SectorService;
