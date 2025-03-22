const { testProcessReportJob } = require("../queueJobs");

testProcessReportJob.process(async(job) => {
    const {name} = job.data;

    setTimeout(()=>{
        console.log(`Test process report for ${name} is done`);
    },3000)
})