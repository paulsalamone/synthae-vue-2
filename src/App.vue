<template>
  <div id="app">
    <header>
      <h1>p5 player</h1>
    </header>
    <main><P5Canvas /></main>
  </div>
</template>

<script>
import P5Canvas from './components/p5-canvas'

export default {
  name: 'App',
  components: {
    P5Canvas
  },
  data() {
    return {}
  }
}
</script>
