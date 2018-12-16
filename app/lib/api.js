import {
  Toast
} from 'native-base';
//import { create } from 'apisauce'
//const apihost = 'https://2bb117ad.ngrok.io/api/'
//const apihost ='https://hamrahan.herokuapp.com/api/'
//const apihost = 'http://192.168.1.199:3000/api/'
const apihost = 'http://185.88.154.168/api/'
const apihost2 = 'https://mcstest.mci.ir/api/'

class Api {
  static token = "";
  static headers() {
    return {
      'Content-Type': 'application/json',
      // 'Accept': 'application/json',
      // 'dataType': 'json',
      // 'access-token': Api.token,
    }
  }
  static apiAddress = apihost;
  static fileContainer = apihost + "containers/";
  static getFilePath(model) {
    return apihost + "containers/" + model + "/download/"
  }
  // static adapter = create({
  //   baseURL: apihost,
  //   headers: Api.headers()
  // })
  //apisauce api documantation => https://github.com/infinitered/apisauce
  // adapter.get('/repos/skellock/apisauce/commits')
  // adapter.head('/me')
  // adapter.delete('/users/69')
  // adapter.post('/todos', {note: 'jump around'}, {headers: {'x-ray': 'machine'}})
  // adapter.patch('/servers/1', {live: false})
  // adapter.put('/servers/1', {live: true})
  // adapter.link('/images/my_dog.jpg', {}, {headers: {Link: '<http://example.com/profiles/joe>; rel="tag"'}})
  // adapter.unlink('/images/my_dog.jpg', {}, {headers: {Link: '<http://example.com/profiles/joe>; rel="tag"'}})


  static getCollection(apiPath, filters, andOr) {
    //filters=[{fname:'ali'},{lname:'mosavi'}]
    //apiPath='members'
    let filterParams = {}
    if (filters) {
      let condition = { where: { and: filters } };
      if (andOr && andOr == "or")
        condition = { where: { or: filters } };
      filterParams.filter = condition
    }
    return this.get(apiPath, null, filterParams)
  }
  //apiPath='transactions'

  //filterObject={sellerId:"5abc818c36a12033f4dd2eaf"}
  //filterObject={and:[{sellerId:"5abc818c36a12033f4dd2eaf"},{or:[{amount:500},{amount:300}]}]}

  //orderArray="amount asc";
  //orderArray=["step DESC","amount desc"];

  //limit=30
  //نمونه فیلتر پیشرفته
  //filter={where:{and:[{sellerId:"5abc818c36a12033f4dd2eaf"},{or:[{amount:500},{amount:300}]}]},order:["step DESC","amount asc"] ,limit:30  }
  static fetchCollection(apiPath, condition, order, limit, skip) {
    let filterParams = {};
    filterParams.where = condition || {};
    filterParams.order = order || "";
    filterParams.limit = limit || 10;
    filterParams.skip = skip || 0;
    return this.get(apiPath, null, filterParams)
  }
  //condition={isSeen:false}
  static getCount(apiPath, condition) {
    let filterParams = {};
    condition = condition || {};
    return this.xhr(apiPath + "/count", null, condition, null, 'GET', 'where')
      .then((res) => res.count)
  }
  static get(apiPath, model, filterParams, urlParams) {
    return this.xhr(apiPath, model, filterParams, urlParams, 'GET');
  }
  static getById(apiPath, id, filterParams) {
    return this.xhr(apiPath + "/" + id, null, filterParams, null, 'GET')
  }

  static put(apiPath, model) {
    model.udate = new Date().toJSON();
    return this.xhr(apiPath, model, null, null, 'PUT')
  }

  static post(apiPath, model) {
    model.cdate = new Date().toJSON();
    model.udate = new Date().toJSON();
    return this.xhr(apiPath, model, null, null, 'POST')
  }
  static post2(apiPath, model) {
    var form_data = new FormData();
    for (var key in model) {
      form_data.append(key, item[key]);
    }
    return this.xhr(apiPath, form_data, null, null, 'POST')
  }
  static editList(apiPath, list) {
    let listJstringify = encodeURIComponent(JSON.stringify(list));
    return this.xhr(apiPath, null, null, { list: listJstringify }, 'GET')
      .then((res) => res.list);
  }
  //condition={isSeen:false} newValue={isSeen:true}
  static updateByCondition(apiPath, condition, newValue) {
    let filterParams = {};
    condition = condition || {};
    newValue.udate = new Date();
    return this.xhr(apiPath + "/update", newValue, condition, null, 'Post', 'where')
      .then((res) => res.count)
  }
  static postFile(apiPath, model) {
    return this.xhr(apiPath, model, null, null, 'POST')
  }

  static delete(apiPath, id) {
    return this.xhr(apiPath + '/' + id, null, null, null, 'DELETE')
  }
  static deleteByCondition(apiPath, condition) {
    condition = condition || {};
    return this.xhr(apiPath + "/removeByCondition", null, condition, null, 'DELETE', 'where')
  }
  //(A2.43)16=10*161 + 2*160 + 4*16-1 + 3*16-2=162.2617188 بجای این کار می توان از تبدیل مبنا 36 به 10 برای بدست آوردن عدد یونیک استفاده کرد
  static getUniqeNumber(funk) {
    var self = this;
    return this.xhr("IndexGenerators", null, null, 'GET')
      .then(index => {
        index[0].last = index[0].last + 1;
        funk(index[0].last);
        self.put("IndexGenerators", index[0])
      })
  }

  static xhr(apiPath, body, filterParams, urlParams, method, verb) {
    let urlParamsStr = "";
    let filterParamsStr = "";
    let tokenStr = "";
    let urlParamList;
    if (urlParams) {
      urlParamList = Object.getOwnPropertyNames(urlParams);
      for (let i = 0; i < urlParamList.length; ++i) {
        let key = urlParamList[i];
        urlParamsStr += key + '=' + urlParams[key] + '&';
      }
    }
    console.log(filterParams)
    if (filterParams == "undefined")
      filterParams = undefined;
    if (filterParams)
      try {
        let verb2 = verb || 'filter'
        filterParamsStr = verb2 + '=' + encodeURIComponent(JSON.stringify(filterParams));
      } catch (error) {

      }
    if (filterParams == "undefined")
      token = undefined;
    if (this.token)
      tokenStr = `access_token=${this.token}`;
    let options = Object.assign({ method: method }, body ? { body: JSON.stringify(body) } : null);
    options.headers = Api.headers();
    let url = `${apihost}${apiPath}/?${urlParamsStr}${filterParamsStr}&${tokenStr}`

    url = url.replace('&&', '&');
    console.log(url);
    return fetch(url, options)
      .then(res => res.json())
      .catch(error => {
        console.log('Error:', error)
        throw error;
        this.props.addEntity("bugs", { err: error });
      })
      .then(response => {
        console.log('Success:', response)
        if (response.error)
          throw response.error;
        return response;
      });



    // return fetch(url, options)
    //   .then(resp => {
    //     console.log(resp);
    //     let json;
    //     try {
    //       json = JSON.parse(resp._bodyInit)
    //     } catch (ex) {
    //       Toast.show({
    //         text: "سرور خاموش می باشد. لطقا با بخش پشتیبانی هم راه تماس بگیرید.",
    //         duration: 50000,
    //         type: 'danger',
    //         position: "top"
    //       })
    //       throw resp
    //     }
    //     if (resp.ok)
    //       return json
    //     else if (json.error)
    //       throw json.error
    //     else
    //       throw resp
    //   }).catch((ex) => {
    //     throw ex;
    //   });


  }
  //*******************************abdi****************************************************** */

  static fetchCollection2(apiPath, condition, order, limit, skip) {
    debugger
    let filterParams = {};
    filterParams.where = condition || {};
    filterParams.order = order || "";
    filterParams.limit = limit || 10;
    filterParams.skip = skip || 0;
    return this.get2(apiPath, null, filterParams)
  }

  static get2(apiPath, model, filterParams, urlParams) {
    return this.xhr2(apiPath, model, filterParams, urlParams, 'GET');
  }

  static xhr2(apiPath, body, filterParams, urlParams, method, verb) {
    let urlParamsStr = "";
    let filterParamsStr = "";
    let tokenStr = "";
    let urlParamList;
    if (urlParams) {
      urlParamList = Object.getOwnPropertyNames(urlParams);
      for (let i = 0; i < urlParamList.length; ++i) {
        let key = urlParamList[i];
        urlParamsStr += key + '=' + urlParams[key] + '&';
      }
    }
    console.log(filterParams)
    if (filterParams == "undefined")
      filterParams = undefined;
    // if (filterParams)
    //   try {
    //     let verb2 = verb || 'filter'
    //     filterParamsStr = verb2 + '=' + encodeURIComponent(JSON.stringify(filterParams));
    //   } catch (error) {

    //   }
    if (filterParams == "undefined")
      token = undefined;
    if (this.token)
      tokenStr = `access_token=${this.token}`;
    let options = Object.assign({ method: method }, body ? { body: JSON.stringify(body) } : null);
    //options.headers = Api.headers();
    let url = `${apihost2}${apiPath}/?page=${filterParams.skip }&limit=${filterParams.limit || 10}`

    url = url.replace('&&', '&');
    console.log(url);
    return fetch(url, options)
      .then(res => res.json())
      .catch(error => {
        console.log('Error:', error)
        throw error;
        this.props.addEntity("bugs", { err: error });
      })
      .then(response => {
        console.log('Success:', response)
        if (response.error)
          throw response.error;
        return response;
      });

  }
}

export default Api
