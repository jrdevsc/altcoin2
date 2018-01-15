const bUrl = "https://api.coinmarketcap.com/v1/ticker/?limit=0";
const gUrl = " https://api.coinmarketcap.com/v1/global/";

axios.get(gUrl)
  .then(function(res){
    let data = res.data;
    fillGlobal(data);
  })
  .catch(function(err){
    console.log(err);
  })

  function fillGlobal(data){
    console.log(data);
    $('#globals').html(`<p>Total Market Cap: $ ${data.total_market_cap_usd}</p><p>Total 24H Volume: $ ${data.total_24h_volume_usd}</p><p>BTC Percentage of Market Cap: ${data.bitcoin_percentage_of_market_cap}%</p>`)
  }


$('#findMe').on('click', function(){
  axios.get(bUrl)
    .then(function(res){
      var data = res.data;
      filterThis(data);
    })
    .catch(function(err){
      console.log(err);
    })


  function filterThis(data){
    console.log(data.length);
    for(var i = 0; i < data.length; i++){
      const maxMC = 1000000000;
      const circSupply = 200000000;
      const myMC = parseInt(data[i].market_cap_usd);
      const myCSupply = parseInt(data[i].available_supply);
      if(myMC <= maxMC && myCSupply <= circSupply){
        console.log(data[i]);
        $('#results').append(`<tr><th scope="row">${data[i].symbol}</th><td>${data[i].name}</td><td>${data[i].market_cap_usd}</td><td>${data[i].available_supply}</td><td>${data[i].price_usd}</td></tr>`)


      }
    }
  }
})
