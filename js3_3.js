var autoCompleteView = function(container,list, model) {

 
      _optionsDom = document.createElement('div');
  

  _optionsDom.setAttribute('class', 'options');


  list.appendChild(_optionsDom);

  
  container.addEventListener('keyup', function(e){
     var text = e.target.value;
     
     model.filterOptions(text);
  }); 
  
  function render(data){
       
            _optionsDom.innerHTML = '';
 
         for(let option of data) {
       _optionsDom.innerHTML+= option+"<br/>" ;
        }
      }   

   
            
  model.subscribe(render);
};
    
var model = function(config){
  var _subscriber,
      _options = config.options || [];
  
  
  function filterOptions(key){
    var result = [], key = key.toUpperCase();
    
    if(key !== '') {
      for(let option of _options){
         if(option.indexOf(key) > -1) {
            result.push(option);
         }
      }
    }

    _subscriber(result);
  }
  
  return {
    subscribe: function(fn) {
      if(!_subscriber) _subscriber = fn;
    },
    filterOptions: filterOptions
  }
};


var Container = document.querySelector('.myInput');
var List= document.querySelector('.list');
var config = {
  options: [
    'CA',
    'AZ',
    'WA',
    'NY',
    'OR',
    'TX',
    'TS',
    'ML',
    'MX'
  ]
};
var model = model(config);

var view = autoCompleteView(Container,List, model);


