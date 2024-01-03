class AdminService {
  constructor(client) {
    this.Admin = client.db().collection("admins");
  }

  extractAdminData(payload) {
    const admin = {
      name: payload.name,
      email: payload.email,
      password: payload.password,
      address : payload.address,
      phone : payload.phone,
      isAdmin: payload.isAdmin,
    };
    Object.keys(admin).forEach(
      (key) => admin[key] === undefined && delete admin[key]
    );
    return admin;
  }

  async check(filter) {
    // console.log( filter.email);
    const cursor = await this.admin.find(filter);
    return await cursor.toArray();
  }

  async register(payload) {
    const admin = await this.extractAdminData(payload);
    const result = await this.Admin.findOneAndUpdate(
      admin,
      { $set: { isAdmin: true, } },
      { returnDocument: "after", upsert: true }
    );
    return result;
    }
}

module.exports = AdminService;
