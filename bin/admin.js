const db = require('./db');

module.exports = {
  getList: () => db.manyOrNone('SELECT id, phone FROM public.phone ORDER BY id DESC'),
  getItem: (id) => db.oneOrNone('SELECT id, phone FROM public.phone WHERE id = $1', [id]),
  findItem: (data) => db.oneOrNone('SELECT id FROM public.phone WHERE phone = $1', [data.phone]),
  addItem: (data) => db.none('INSERT INTO public.phone (phone) VALUES($1)', [data.phone]),
  updateItem: (data) => db.none('UPDATE public.phone SET phone = $1 WHERE id = $2', [data.phone, data.id]),
  deleteItem: (data) => db.none('DELETE FROM public.phone WHERE id = $1', [data.id])
};