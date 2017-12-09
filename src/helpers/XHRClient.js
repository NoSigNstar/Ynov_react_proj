// import API from 'whatwg-fetch';
import xhr from 'xhr';

class Client {
  _formatQuery(type = 'GET', params) {
    let query = '';

    for (let key in params) {
      if (params[key]) {
        query = query + (key + '=' + params[key] + '&');
      }
    }

    if (query.length > 0) {
      query = (type === 'POST') ? ('' + query) : ('?' + query);
    }

    return query;
  }

  get(url, options = {}) {
    // let fullUrl = url + this._formatQuery('GET', options.query);

    return fetch(url, { method: 'GET' }).then((response) => {
      return response.json();
    }).then((json) => {
      return json;
    }).catch((error) => {
      return { error: error };
    });
  }

  post(url, options = {}) {
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: options.accept || 'application/json',
        'Content-Type': options.contentType || 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: options.body
    }).then((response) => {
      const { ok, status, statusText } = response;

      if (!ok) {
        return { error: statusText, code: status };
      }

      return response.json();
    }).then((json) => {
      return json;
    }).catch((error) => {
      return { error: error };
    });
  }

  search(endpoint, source, accessToken, proximity, query, callback) {
    const searchTime = new Date();
    const url = endpoint + '/geocoding/v5/' + source + '/' + encodeURIComponent(query) + '.json' + '?access_token=' + accessToken + (proximity ? '&proximity=' + proximity : '');

    xhr({ uri: url, json: true }, function (err, res, body) {
      callback(err, res, body, searchTime);
    });
  }
}

module.exports = new Client();
