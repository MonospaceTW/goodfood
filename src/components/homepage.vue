<template>
<div class="flex-container">
  <div class="flex-item">
   <img src="../imgs/logo.svg" class="home-logo">
   <p class="home-text">SET LUNCH</p>

   <button>吃飯囉</button>
  </div>
</div>

</template>

<script type = "text/javascript" >

export default {
};


// setTimeout( "location.href='http://google.com'", 100000 )
</script>


<style>
.flex-container {
 display: -webkit-flex;
    display: flex;
    height: 637px;
    background-color: #f7a654;
          
}

.flex-item {
margin: auto;

}

.home-text{
     margin-left:40px; 
     color:#b15814;
     font-size: 16px;
}

.home-logo{
     height:150px;
     width:150px;
}

</style>