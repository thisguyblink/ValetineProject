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
  margin: 0.5em;
  padding: 2em;
  border: dotted  0.5em;
}

:global(body) {
  background-color: var(--light-bg);
  color: var(--light-color); /* Default light color */
  /* transition: color 0.3s, background-color 0.3s; */
}

:global(.dark-mode) {
  background-color: var(--dark-bg);
  color: var(--dark-color);
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
  background-color: var(--light-code); /* Default background */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); /* Soft shadow */
  font-size: 2em;
}

:global(.dark-mode) .switch {
  background-color: var(--dark-code);
}

</style>
