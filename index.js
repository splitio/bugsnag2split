const axios = require('axios').default;
const fs = require('fs');

exports.handler = async (event) => {
    const body = JSON.parse(event.body);
    console.log(body);

    const ignoreList = [ 'stackTrace', 'featureFlags', 'breadcrumbs', 'metaData'];

    const properties = {};
    Object.keys(body.error).forEach((key) => {
        if(!ignoreList.includes(key)) {
            if(typeof body.error[key] === 'object') {
                Object.keys(body.error[key]).forEach((subkey) => {
                    if(subkey !== 'dsymUUIDs') {
                        properties[key + '.' + subkey] = body.error[key][subkey];
                    }
                });
            } else {
                properties[key] = body.error[key];
            }
        }
    });

    const userId = body.error.userId;
    const SPLIT_API_KEY = fs.readFileSync('SPLIT_API_KEY').toString().trim();

    const e = {
        eventTypeId: 'bugsnag_error_wh',
        trafficTypeName: 'user',
        key: userId,
        timestamp: new Date().getTime(),
        properties: properties
    }

    const authorization = 'Bearer ' + SPLIT_API_KEY;
    await axios({
      method: 'post',
      url: 'https://events.split.io/api/events',
      headers: {
        'Authorization' : authorization,
        'Content-Type' : 'application/json'
      },
      data: e
    }).then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    const response = {
        statusCode: 200,
        body: JSON.stringify('bugsnag error sent to split'),
    };
    return response;
};
