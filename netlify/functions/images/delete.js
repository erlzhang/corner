
const process = require('process')
const OSS = require('ali-oss');

let client = new OSS({
  // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
  region: 'oss-cn-beijing',
  // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
  accessKeyId: process.env.OSS_KEY_ID,
  accessKeySecret: process.env.OSS_KEY_SECRET,
  bucket: 'erlgallery'
});

const handler = async (event) => {
  try {
    const result = await client.delete(event.id);
    return {
      statusCode: 200,
      body: JSON.stringify({code: 1}),
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    }
  }
}

module.exports = { handler }
