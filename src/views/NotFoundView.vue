<template>
   <v-container id="statistics-container" fill-height>
      <h1 class="first-four">4</h1>
      <div class="cog-wheel1">
        <div class="cog1">
          <div class="top"></div>
          <div class="down"></div>
          <div class="left-top"></div>
          <div class="left-down"></div>
          <div class="right-top"></div>
          <div class="right-down"></div>
          <div class="left"></div>
          <div class="right"></div>
        </div>
      </div>
     
      <div class="cog-wheel2">
        <div class="cog2">
          <div class="top"></div>
          <div class="down"></div>
          <div class="left-top"></div>
          <div class="left-down"></div>
          <div class="right-top"></div>
          <div class="right-down"></div>
          <div class="left"></div>
          <div class="right"></div>
        </div>
      </div>
      <h1 class="second-four">4</h1>
      <p class="wrong-para">Parce que la pagina que buscas no existe!</p>
   </v-container>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap");
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700");

* {
  margin: 10;
  padding: 0;
}

.container {
  justify-content: center;
  align-items: center;
  font-family: "Poppins", sans-serif;
  text-align: center;
  max-width: 100%;
}

.cog-wheel1,
.cog-wheel2 {
  transform: scale(0.7);
  z-index: 1;
}

.cog1 {
  transform: scale(0.7);
  z-index: 1;
  animation-name: on-clock;
  animation-duration: 10s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

.cog2 {
  animation-name: against-clock;
  animation-duration: 10s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

.cog1,
.cog2 {
  width: 40vmin;
  height: 40vmin;
  border-radius: 50%;
  border: 6vmin solid #FDF21C;
  position: relative;
}

.cog2 {
  border: 6vmin solid #00457C;
}

.top,
.down,
.left,
.right,
.left-top,
.left-down,
.right-top,
.right-down {
  width: 10vmin;
  height: 10vmin;
  background-color: #FDF21C;
  position: absolute;
}

.cog2 .top,
.cog2 .down,
.cog2 .left,
.cog2 .right,
.cog2 .left-top,
.cog2 .left-down,
.cog2 .right-top,
.cog2 .right-down {
  background-color: #00457C;
}

.top {
  top: -14vmin;
  left: 9vmin;
}

.down {
  bottom: -14vmin;
  left: 9vmin;
}

.left {
  left: -14vmin;
  top: 9vmin;
}

.right {
  right: -14vmin;
  top: 9vmin;
}

.left-top {
  transform: rotateZ(-45deg);
  left: -8vmin;
  top: -8vmin;
}

.left-down {
  transform: rotateZ(45deg);
  left: -8vmin;
  top: 25vmin;
}

.right-top {
  transform: rotateZ(45deg);
  right: -8vmin;
  top: -8vmin;
}

.right-down {
  transform: rotateZ(-45deg);
  right: -8vmin;
  top: 25vmin;
}

.cog2 {
  position: relative;
  left: -10.2vmin;
  bottom: 10vmin;
}

h1 {
  color: #303030;
}

.first-four {
  position: relative;
  left: 6vmin;
  font-size: 40vmin;
}

.second-four {
  position: relative;
  right: 18vmin;
  z-index: 0;
  font-size: 40vmin;
}

.wrong-para {
  font-family: "Montserrat", sans-serif;
  position: absolute;
  bottom: 15vmin;
  padding: 3vmin 12vmin 3vmin 3vmin;
  font-weight: 600;
  color: #002547;
}

@keyframes on-clock {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

@keyframes against-clock {
  0% {
    transform: rotate(360deg);
  }
  50% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>