<script lang="ts">
  import { onMount } from 'svelte'
  import Map from './map/Map'
  import { getCellFromCoords } from './utils';

  import Header from './components/Header.svelte';
  import Layer from './components/Layer.svelte';

  import './styles/global.css';

  let root;
  let map;
  let coords = {
    x: 0,
    y: 0,
    cell: [0, 0]
  };

  onMount(() => {
    map = new Map({
      element: root.querySelector(".map-container"),
      canvas: root.querySelector(".map-canvas"),
      rows: 20,
    })

    console.log(map)
  })

  function handleMouseMove(event) {
    let rect = map.canvas.getBoundingClientRect()
    coords.x = Math.floor((event.clientX - rect.left) / map.render.scale) 
    coords.y = Math.floor((event.clientY - rect.top) / map.render.scale) 
    coords.cell = getCellFromCoords(coords.x, coords.y, map.tileSize)
  }

</script>

<main bind:this="{root}">
  <Header />

  <div class="row m-0 p-0 g-0">
    <div class="col-9 map-container position-relative">
      <h6 class="position-absolute">Map</h6>
      <canvas on:mousemove={handleMouseMove} class="map-canvas position-absolute" width="100%" height="auto"></canvas>
      <div class="position-absolute" style="bottom: 5px; right: 5px;">
        <button class="fa-btn" on:click={map.render.increaseScale()}>
          <i class="fas fa-magnifying-glass-plus"></i>
        </button>
      </div>
      <div class="position-absolute" style="bottom: 5px; right: 35px;">
        <button class="fa-btn" on:click={map.render.decreaseScale()}>
          <i class="fas fa-magnifying-glass-minus"></i>
        </button>
      </div>
      <div class="position-absolute" style="bottom: 5px; right: 70px;">
        <button class="fa-btn" on:click={map.toggleGrid()}>
          <i class="fas fa-border-none"></i>
        </button>
      </div>
      <div class="position-absolute" style="bottom: 5px; left: 5px;">
        <p>Coords: <span>{ coords.x }x{ coords.y }</span> </p>
        <p>Cell: <span>{ coords.cell }</span></p>
      </div>
    </div>
    <div class="col">
      <div class="panel">
        <h6 class="mb-3">
          Sheet
        </h6>
        <div class="tilesheet-container">
          <canvas class="tilesheet-canvas"></canvas>

        </div>
      </div>
      <div class="panel">
        <h6>Layers</h6>
        <Layer name={0} />
      </div>
    </div>
  </div>
</main>

<style>

</style>
