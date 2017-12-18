new Vue({
  el:'#result',
  data: {
    items:[
      {dishName:'炒飯',number:1,subtotal:60},
      {dishName:'鍋貼',number:2,subtotal:120},
    ],
    orders:[
      {userID:'Clover',
      order:[
        {dishName:'炒飯',number:1,subtotal:60},
        {dishName:'鍋貼',number:2,subtotal:120}
      ]
    },
    {userID:'Kent',
    order:[
      {dishName:'炒飯',number:1,subtotal:60},
      {dishName:'鍋貼',number:2,subtotal:120}
    ]
  }
        
    ]
  },
  computed:{
    total(){
      let total=0;
      for (let i=0; i<this.items.length; i++){
        total+= this.items[i].subtotal;
      }
      return total;
    }
  }
  
});

