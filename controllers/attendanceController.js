// const Attendance = require('../models/Attendance');

// // Mark attendance
// async function markAttendance(req, res) {
//   const { date, attendance } = req.body;

//   try { const markedAttendance = attendance.map((entry) => {
//     return {
//       date: date, // Include the date field
//       studentName: entry.studentName,
//       status: entry.status,
//     };
//   });
//     await Attendance.bulkCreate(markedAttendance);
//     res.sendStatus(200);
//   } catch (error) {
//     console.error('Error marking attendance', error);
//     res.status(500).json({ error: 'Error marking attendance' });
//   }
// }

// async function fetchAttendance(req, res) {
//     const { date } = req.query;
  
//     try {
//       // Now you can use the sequelize object to query the database
//       const results = await Attendance.findAll({
//         where: {
//           date,
//         },
//         attributes: [
//           'studentName',
//           [sequelize.fn('SUM', sequelize.literal('CASE WHEN status = "present" THEN 1 ELSE 0 END')), 'presentCount'],
//           [sequelize.fn('COUNT', sequelize.col('*')), 'totalCount'],
//         ],
//         group: ['studentName'],
//       });
  
//       const attendanceReport = results.map((entry) => {
//         const studentName = entry.studentName;
//         const presentCount = entry.get('presentCount');
//         const totalCount = entry.get('totalCount');
//         const percentage = Math.floor((presentCount / totalCount) * 100);
  
//         return { studentName, percentage };
//       });
  
//       res.json(attendanceReport);
//     } catch (error) {
//       console.error('Error fetching attendance report', error);
//       res.status(500).json({ error: 'Error fetching attendance report' });
//     }
//   }
  



// // Search attendance for a specific date
// async function searchAttendance(req, res) {
//   const { date } = req.query;

//   try {
//     const results = await Attendance.findAll({
//       where: {
//         date,
//       },
//       attributes: ['studentName', 'status'],
//     });

//     res.json(results);
//   } catch (error) {
//     console.error('Error searching attendance data', error);
//     res.status(500).json({ error: 'Error searching attendance data' });
//   }
// }

// module.exports = { markAttendance, fetchAttendance, searchAttendance };





const Attendance = require('../models/Attendance');
const sequelize = require('../config/database');

async function markAttendance(req, res) {
  const { date, attendance } = req.body;

  try {
    const markedAttendance = attendance.map((entry) => ({
      date: date,
      studentName: entry.studentName,
      status: entry.status,
    }));

    await Attendance.bulkCreate(markedAttendance);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error marking attendance', error);
    res.status(500).json({ error: 'Error marking attendance' });
  }
}

/*async function fetchAttendance(req, res) {
  const { date } = req.query;

  try {
    const results = await Attendance.findAll({
      where: {
        date,
      },
      attributes: [
        'studentName',
        [
          sequelize.fn(
            'SUM',
            sequelize.literal('CASE WHEN status = "present" THEN 1 ELSE 0 END')
          ),
          'presentCount',
        ],
        [sequelize.fn('COUNT', sequelize.col('*')), 'totalCount'],
      ],
      group: ['studentName'],
    });

    const attendanceReport = results.map((entry) => {
      const studentName = entry.studentName;
      const presentCount = entry.get('presentCount');
      const totalCount = entry.get('totalCount');
      const percentage = Math.floor((presentCount / totalCount) * 100);

      return { studentName, percentage };
    });

    res.json(attendanceReport);
  } catch (error) {
    console.error('Error fetching attendance report', error);
    res.status(500).json({ error: 'Error fetching attendance report' });
  }
}*/


async function fetchAttendance(req, res) {
    try {
      const results = await Attendance.findAll({
        attributes: [
          'studentName',
          [
            sequelize.fn(
              'SUM',
              sequelize.literal('CASE WHEN status = "present" THEN 1 ELSE 0 END')
            ),
            'presentCount',
          ],
          [sequelize.fn('COUNT', sequelize.col('*')), 'totalCount'],
        ],
        group: ['studentName'],
      });
  
      const attendanceReport = results.map((entry) => {
        const studentName = entry.studentName;
        const presentCount = entry.get('presentCount');
        const totalCount = entry.get('totalCount');
        const percentage = Math.floor((presentCount / totalCount) * 100);
  
        return { studentName, percentage };
      });
  
      res.json(attendanceReport);
    } catch (error) {
      console.error('Error fetching attendance report', error);
      res.status(500).json({ error: 'Error fetching attendance report' });
    }
  }
  


async function searchAttendance(req, res) {
  const { date } = req.query;

  try {
    const results = await Attendance.findAll({
      where: {
        date,
      },
      attributes: ['studentName', 'status'],
    });

    res.json(results);
  } catch (error) {
    console.error('Error searching attendance data', error);
    res.status(500).json({ error: 'Error searching attendance data' });
  }
}

module.exports = { markAttendance, fetchAttendance, searchAttendance };








