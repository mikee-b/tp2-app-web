<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<style>
@keyframes move-text {
  0% {margin:10rem;}
  50% {margin:20rem;}
  100% {margin:10rem;}
}
.about h1{
  text-align: center;
  margin:10rem;
  color: var(--main-text-color);
  animation: move-text 6s infinite;
 
}
</style>
