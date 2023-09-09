// const { QueryTypes } = require("sequelize");

// const sequelize = require("../util/database");

// exports.deleteItem = async (req, res, next) => {
//   const itemId = req.params.itemId;

//   try {
//     indicadores = await sequelize.query(
//       `delete from presupuesto.item where id=:itid`,
//       {
//         type: QueryTypes.SELECT,
//         replacements: { itid: itemId },
//       }
//     );
//   } catch (err) {
//     console.log(err);
//   }
//   res.status(200).json({ mesage: "Item Eliminado" });
// };
