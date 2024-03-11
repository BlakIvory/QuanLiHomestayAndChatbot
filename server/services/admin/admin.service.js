const { ObjectId } = require("mongodb");
class AdminService {
  constructor(client) {
    this.Admin = client.db().collection("admins");
  }

  extractAdminData(payload) {
    const admin = {
      userName: payload.userName,
      password: payload.password,
      birthYear: payload.birthYear,
      avatar: payload.avatar,
      phone: payload.phone,
      isAdmin: payload.isAdmin,
    };
    Object.keys(admin).forEach(
      (key) => admin[key] === undefined && delete admin[key]
    );
    return admin;
  }

  async check(filter) {
    // console.log( filter.email);
    const cursor = await this.Admin.find(filter);
    return await cursor.toArray();
  }
  async checkById(payload) {
    // console.log( filter.email);
    const cursor = await this.Admin.find( {
      _id: new ObjectId(payload.idAdmin),
    },);
    console.log(cursor)
    return await cursor.toArray();
  }

  async register(payload) {
    const admin = await this.extractAdminData(payload);
    const result = await this.Admin.findOneAndUpdate(
      admin,
      { $set: { isAdmin: true } },
      { returnDocument: "after", upsert: true }
    );
    return result;
  }
    async addAdmin(payload) {
      // console.log(payload);
      const admin = await this.extractAdminData(payload);
      const result = await this.Admin.findOneAndUpdate(
        admin,
        { $set: { isAdmin: payload.isAdmin } },
        { returnDocument: "after", upsert: true }
      );
      return result;
    }
    async deleteAdmin(payload) {
      // console.log(payload);
      // const result = await this.Admin.deleteOne({ _id: payload.isAdmin });
      const result = await this.Admin.deleteOne({ _id:new ObjectId(payload.idAdmin)});
      return result;
    }

}

module.exports = AdminService;
