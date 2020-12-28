const express = require('express');
const router = express.Router();
var axios = require('axios');
var qs = require('qs');

router.post('/playlist', async (req, res, next) => {
  var data = qs.stringify({
    grant_type: 'client_credentials',
  });

  var config = {
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization:
        'Basic ZTExNjRhNzgwYWYwNGZkYWI1YzU0MGU5ZmMwNTFmMDk6NGUwNGQ5Zjg3ZmFiNGIxMWE5YjZjOGQwNDc2ODlhY2Q=',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: data,
  };
  const rest = await axios(config);
  console.log(rest);

  const t = rest.data;
  const token = String(t['access_token']);

  console.log(token);
  const text = 'Bearer' + ' ' + token;
  console.log(text);
  if (req.body.score < -0.5) {
    var config = {
      method: 'get',
      url: 'https://api.spotify.com/v1/search?q=positive&type=playlist&limit=3',
      headers: {
        Authorization: text,
      },
    };
    const resp2 = await axios(config);
    console.log(resp2.data);

    return res.status(200).json({
      success: true,
      data: resp2.data,
    });
  } else if (-0.5 < req.body.score && req.body.score < 0.5) {
    var config = {
      method: 'get',
      url: 'https://api.spotify.com/v1/search?q=soul&type=playlist&limit=3',
      headers: {
        Authorization: text,
      },
    };
    const resp2 = await axios(config);
    console.log(resp2.data);

    return res.status(200).json({
      success: true,
      data: resp2.data,
    });
  } else {
    var config = {
      method: 'get',
      url: 'https://api.spotify.com/v1/search?q=party&type=playlist&limit=3',
      headers: {
        Authorization: text,
      },
    };
    const resp2 = await axios(config);
    console.log(resp2.data);

    return res.status(200).json({
      success: true,
      data: resp2.data,
    });
  }
});

module.exports = router;