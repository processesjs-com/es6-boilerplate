import AWS from 'aws-sdk'

AWS.config.update({region: 'eu-central-1'})
const s3 = new AWS.S3()

s3.listBuckets( (err, data) => {
  if (err) { console.log("Error", err) }
  else { console.log("Success", data.Buckets) }
})