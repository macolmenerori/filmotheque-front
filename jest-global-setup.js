// async function running before all tests
// add a global variable TZ specifying the timezone
module.exports = async () => {
  process.env.TZ = 'UTC';
};
