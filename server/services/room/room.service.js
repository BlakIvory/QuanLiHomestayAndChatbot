class RoomService {
    constructor(client) {
        this.Room = client.db().collection("rooms");
    }

    extractRoomData(payload) {
        const room = {
            nameRoom: payload.nameRoom,
            idSectorRoom : payload.idSectorRoom,
            giaRoom : payload.giaRoom,
            loaiRoom : payload.loaiRoom,
            statusRoom : payload.statusRoom,
            imgRoom: payload.imgRoom,
            ordersRoom : payload.ordersRoom,
        };
        Object.keys(room).forEach(
            (key) => room[key] === undefined && delete room[key]
        );
        return room;
    }

    async check(filter) {
        // console.log(filter);
        const cursor = await this.Room.find(filter);
        return await cursor.toArray();
    }

 
    async addRoom(payload) {
        //   console.log(payload)
        const room = await this.extractRoomData(payload);
        const result = await this.Room.findOneAndUpdate(
            room,
            { $set: { statusRoom:0, ordersRoom: [] } },
            { returnDocument: "after", upsert: true }
        );
        return result;
    }

}

module.exports = RoomService;
