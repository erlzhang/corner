const process = require('process')
const OSS = require('ali-oss');
const busboy = require('busboy');

let client = new OSS({
  // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
  region: 'oss-cn-beijing',
  // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
  accessKeyId: process.env.OSS_KEY_ID,
  accessKeySecret: process.env.OSS_KEY_SECRET,
  bucket: 'erlgallery'
});

function parseMultipartForm(event) {
    return new Promise((resolve) => {
        const fields = { image: [] };
        const bb = busboy({ headers: event.headers });

        bb.on('file', (name, file, info) => {
            const { filename, mimeType } = info;

            file.on('data', (data) => {
                if (!fields[name]) fields[name] = [];

                fields[name].push({
                    filename,
                    type: mimeType,
                    content: data,
                });
            });
        });

        bb.on('close', () => {
            resolve(fields);
        });

        bb.end(Buffer.from(event.body, 'base64'));
    });
}

const handler = async (event) => {
  try {
    const fields = await parseMultipartForm(event);
    const image = fields.image[0];
    const result = await client.put(image.filename, image.content);
    const response = {
      name: image.filename
    };
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    }
  }
}

module.exports = { handler }
