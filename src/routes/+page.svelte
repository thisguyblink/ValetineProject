<script>
	import Switch from './Switch.svelte';

	import { browser } from '$app/environment'; // Import browser check

	let multiValue = 'love';
    $: {
	if (browser) {
		document.body.classList.toggle("dark-mode", multiValue === "anti");
	}
}
</script>

<h1 id="title">(Anti) Love Letter</h1>

<div class="switch">
    <Switch bind:value={multiValue}  label="Choose a theme" design="multi" options={['love', 'anti']} fontSize={12} />
    <p>Switch is {multiValue}</p>
</div>

<style>

:root {
  /* this has to be set to switch between light or dark */
  color-scheme: light dark;

  --light-bg: ghostwhite;
  --light-color: darkslategray;
  --light-code: tomato;

  --dark-bg: darkslategray;
  --dark-color: ghostwhite;
  --dark-code: gold;
}

	#title {
		justify-content: center;
		text-align: center;
		color: green;
		margin: 0.5em;
		padding: 2em;
		border: dotted green 0.5em;
	}

	:global(body) {
		background-color: #f2eee2;
		color: #0084f6;
		transition: background-color 0.3s;
	}

	:global(.dark-mode) {
		background-color: #1d3040;
		color: #bfc2c7;
	}

    .switch {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px; /* Adjust width */
    height: 100px; /* Adjust height */
    margin: 20px auto; /* Centers horizontally */
    padding: 20px;
    border-radius: 10px;
    background-color: #f0f0f0; /* love gray background */
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); /* Soft shadow */
    font-size: 2em;
    }

</style>
