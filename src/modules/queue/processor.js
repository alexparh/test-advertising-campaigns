module.exports = async (job) => {
  const { startDate, endDate, isUserInitiated } = job.data;

  console.log(`Data Fetch started: ${startDate} - ${endDate}`);

  try {
    // get data from an api
    // map
    // store in db
    console.log(`Data Fetch started: ${startDate} - ${endDate}`);
  } catch (error) {
    console.error('Processing error:', error);
    throw error;
  }
};
