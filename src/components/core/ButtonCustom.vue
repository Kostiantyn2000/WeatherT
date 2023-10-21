<template>
  <button 
    :type="btnType" 
    class="primary-btn">
    <slot>
    </slot>
  </button>
</template>

<script>
  export default {
    name: 'button-custom',
    props: {
      btnType: {
        Type: String,
        default: 'button'
      },
    },
  }
</script>

<style scoped>
.primary-btn{
  border: none;
  background-color:#F58F7C;
  padding: 0.5rem 1rem;
  color: #2C2B30;
  font-weight: bold;
  cursor: pointer;
}
.primary-btn:hover{
  color: #2C2B30;
  text-decoration: none;
  box-shadow: 0 2px 2px rgba(0,0,0,.2);
  background-color: #fff;
}
.primary-btn:focus{
  color: #2C2B30;
  text-decoration: none;
  outline: none;
}
.primary-btn.white{
  box-shadow: 0 2px 2px rgba(0,0,0,.2);
  background-color: #fff;
}
.arrow-right-btn:after {
  content: "\00bb";
  opacity: 1;
  width: 12px;
  margin-left: 8px;
}
@media (min-width: 768px){
  .arrow-right-btn:after {
    content: "\00bb";
    opacity: 0;
    overflow: hidden;
    width: 0;
    -webkit-transition: all .3s ease-in-out;
    transition: all .3s ease-in-out;
    color: #F58F7C;
    margin-left: 0px;
  }
  .arrow-right-btn:hover:after {
    opacity: 1;
    width: 12px;
    margin-left: 8px;
  }
}
</style>
