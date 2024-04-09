const { ObjectId } = require("mongodb");
class RoomService {
  constructor(client) {
    this.Room = client.db().collection("rooms");
  }

  extractRoomData(payload) {
    const room = {
      nameRoom: payload.nameRoom,
      idSectorRoom: payload.idSectorRoom,
      giaRoom: payload.giaRoom,
      loaiRoom: payload.loaiRoom,
      statusRoom: payload.statusRoom,
      imgRoom: payload.imgRoom,
      danhgiaRoom: payload.danhgiaRoom,
      ordersRoom: payload.ordersRoom,
      cmtRoom: payload.cmtRoom,
      discRoom: payload.discRoom,
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

  async checkByIdRoom(filter) {
    // console.log(filter);
    const cursor = await this.Room.find({
      _id: ObjectId.isValid(filter.idRoom) ? new ObjectId(filter.idRoom) : null,
    });
    return await cursor.toArray();
  }

  async addRoom(payload) {
    //   console.log(payload)
    const room = await this.extractRoomData(payload);
    const result = await this.Room.findOneAndUpdate(
      room,
      {
        $set: {
          statusRoom: 0,
          ordersRoom: [],
          danhgiaRoom: 5,
          discRoom: "",
          cmtRoom: [],
        },
      },
      { returnDocument: "after", upsert: true }
    );
    return result;
  }

  async deleteRoom(payload) {
    console.log(payload);

    const result = await this.Room.deleteOne({
      _id: ObjectId.isValid(payload._id) ? new ObjectId(payload._id) : null,
    });
    return result;
  }
  async OrderRoom(payload) {
    // console.log(payload);

    const result = await this.Room.findOneAndUpdate(
      {
        _id: ObjectId.isValid(payload.idRoom) ? new ObjectId(payload.idRoom) : null,
      },
      {
        $push: {
          ordersRoom: payload.dateOrderRoom,
        },
      },
      { returnDocument: "after", }
    );
    // console.log(result)
    return result;
  }
  async findRoomByIdSector(filter) {
    // console.log(filter);
    const cursor = await this.Room.find({
      idSectorRoom: filter.enKhuVuc,
    });
    return await cursor.toArray();
  }
}

module.exports = RoomService;
