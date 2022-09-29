/*
  Not testing GradeConverter since it just makes a call to GradeDBService.ts,
  which communicates with the database.
  Going with the mockist approach I would simply mock the DB and since there's no additional logic beyond
  the DB, the tests would serve no purpose.
  And no, this isn't an excuse for not doing it 😅
*/
