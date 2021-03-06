export default class ApiClient {
  baseUrl;
  token;
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.token = options.token;
  }

  static returnStatusAndJson = (response) => {
    // response.status (number) - HTTP response code in the 100–599 range
    // response.statusText (String) - Status text as reported by the server, e.g. "Unauthorized"
    // response.ok (boolean) - True if status is HTTP 2xx
    // response.headers (Headers)
    // response.url (String)

    return response
      .json()
      .then((json) => ({ status: response.status, json: json }))
      .catch(() => ({ status: response.status, json: null }));
  };
  getConfig = (method, data) => {
    let config = {
      body: null,
      credentials: 'same-origin',
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        Authorization: 'Bearer ' + this.token
      }
    };

    if (data) {
      config.body = JSON.stringify(data);
    }
    return config;
  };
  get = (endpoint, filter = '') => {
    return fetch(this.baseUrl + endpoint + filter)
      .then((response) => response.json())
      .then((data) => data);
  };

  post = (endpoint, data) => {
    return fetch(this.baseUrl + endpoint, this.getConfig('post', data))
      .then((response) => response.json())
      .then((data) => data);
  };

  put = (endpoint, data) => {
    return fetch(this.baseUrl + endpoint, this.getConfig('put', data)).then(
      ApiClient.returnStatusAndJson
    );
  };

  delete = (endpoint) => {
    return fetch(this.baseUrl + endpoint, this.getConfig('delete')).then(
      ApiClient.returnStatusAndJson
    );
  };

  postFormData = (endpoint) => {
    // var input = document.querySelector('input[type="file"]');
    let input;
    let formData = new FormData();
    for (const file of input.files) {
      formData.append('files', file, file.name);
    }
    return fetch(this.baseUrl + endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        Authorization: 'AUTH TOKEN'
      },
      body: formData
    });
  };
}
