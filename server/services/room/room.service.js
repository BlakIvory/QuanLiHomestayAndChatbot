const { ObjectId } = require("mongodb");
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
            danhgiaRoom : payload.danhgiaRoom, 
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
            { $set: { statusRoom: 0, ordersRoom: [],danhgiaRoom : 0,  } },
            { returnDocument: "after", upsert: true }
        );
        return result;
    }

    async deleteRoom(payload) {
          console.log(payload)
        
          const result = await this.Room.findOneAndDelete(
           {
            _id: ObjectId(payload._id) ? new ObjectId(payload._id) : null
           }
        );
        return result;
    }
}

module.exports = RoomService;
