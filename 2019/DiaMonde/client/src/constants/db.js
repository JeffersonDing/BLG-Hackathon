var db = {
  data: {}
};

export default db;

export const updateDb = (o) => {
  db.data = {...db.data, ...o}
}
