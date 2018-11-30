const events = require('events');
const asyncRequest = require('../request/asyncRequest.js')


module.exports = function getPrimeData (requestOptions) {
  return new Promise(function(res) {
      function asyncResponseObj (eventEmitter,requestOptions) {
        this.pagination = {
           items: [],
           hasMore: false,
           quotaMax: 0,
           quotaRemaining: 0,
           next:0,
           pagNumbers: []
         };
        this.requestOptions = requestOptions;
        this.proccessResponse = function (response) {
          const asJson = JSON.parse(response);
          asJson.queryResponse.entity.map(d => this.pagination.items.push(d));
          console.log(`Recieved page: ${asJson.queryResponse['@first']}`)
          if (this.pagination.quotaRemaining + 100 == this.pagination.items.length) {
            console.log("all data received")
            res(this.pagination.items);
          }
        };
        this.more2 = function (response) {
          const asJson = JSON.parse(response);
          asJson.queryResponse.entity.map(d => this.pagination.items.push(d));
          const first = +asJson.queryResponse['@first'];
          const last = +asJson.queryResponse['@last'];
          const count = +asJson.queryResponse['@count'];
          if (last < count -1){
            console.log(`Mutiple pages required: ${Math.round((count / 100))}`);
            this.pagination.hasMore = true;
            this.pagination.quotaMax = count;
            this.pagination.quotaRemaining = count - (first + 1 + last);
            this.pagination.next = +asJson.queryResponse['@last'] + 1;
            const arrayMaker = (number) =>{
              let emptyArray = [];
              for (let i = 1; i < number+1; i++ ) {
                emptyArray.push(100 * i)
              }
              return emptyArray
            };
            this.pagNumbers = arrayMaker(Math.round((count / 100)));
            const rateLimited = this.pagNumbers.map((d,i) => {
              setTimeout(()=> {
                asyncRequest(this.requestOptions(d)).then(t => eventEmitter.emit('newData',t));
              },i*1000)
            })

          } else {
            res(this.pagination.items);
          };
        }
      }

      const eventEmitter = new events.EventEmitter();

      //const dataRequest = await asyncRequest(requestOptions(pagination.next));
      const primeData = new asyncResponseObj(eventEmitter,requestOptions);
      eventEmitter.on('newData', function (d){primeData.proccessResponse(d)});
      asyncRequest(primeData.requestOptions(0))
      .then(t=> primeData.more2(t))
      console.log("gorN!!!")
  })

  //console.log(jsonResponse)

};
