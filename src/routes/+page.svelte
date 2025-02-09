<script>
	import Switch from './Switch.svelte';

	import { browser } from '$app/environment'; // Import browser check

	let multiValue = 'love';
    let message = "";
    let msgLength;
    let email = "";
    let loveStatus = false;
    let loveVal = "Love Letter";
    let output = "";
    let dialog;
    let submitted = false;
    $: msgLength = message.length;

    $: {
	    if (browser) {
		    document.body.classList.toggle("dark-mode", multiValue === "anti");
            loveStatus = !loveStatus
	    }
        if (loveStatus){
            loveVal = "Love Letter"
        } else {
            loveVal = "(Anti) Love Letter"
        }
    }

    function showPop() {
        dialog.showModal();
    }
    function closePop() {
        dialog.close();
    }

    async function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function loading() {
      for (let i = 0; i < 5; i++) {
        output = "Loading .";
        await sleep(500);
        output = "Loading . . ";
        await sleep(500);
        output = "Loading . . . ";
        await sleep(500);
      }

    }

    async function sendEmail() {
      submitted = true;
      output = "Loading ...";
        try {
            const response = await fetch('/sendE', {
                method: 'POST',
                body: JSON.stringify({ email, message, loveStatus }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            output = data.success ? "Email sent successfully!" : `Error: ${data.details}`;
        } catch (err) {
            output = `Failed to send email. Failed to send email to: ${email}... with the message: ${message}`;
        }
        showPop();          
        message = "";
        email = "";
        await loading();
        output = "Email has been submitted"
    }


</script>

<h1 id="title"> {loveVal}</h1>

<div class="switch">
    <Switch bind:value={multiValue}  label="Choose a theme" design="multi" options={['love', 'anti']} fontSize={12} />
</div>

<div class=bottom>
        <label for="email">Email Address</label>
        <textarea name="email"  placeholder="Email Address" rows="2" cols="40" wrap="soft" maxlength="50" autocomplete="email" bind:value = {email} ></textarea>
        <br>
        <label for="letter">Letter</label>
        <textarea name="letter" placeholder="Write Letter Here" rows="12" cols="30" wrap="soft" maxlength="450" bind:value = {message} ></textarea>
        <p>{message.length}/400</p>
        <button on:click={() => sendEmail()}>Send</button>
        
        
</div>

<dialog class="popup" bind:this={dialog}>
  <br>
  <h2>{output}</h2>
  <button type="button" id="exit" on:click={() => {
    closePop();
    }}>Close</button>
</dialog>


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
  --dark-alt: #c1121f;
  transition: all 1s ease;
}

#title {
  justify-content: center;
  text-align: center;
  margin: 0.5em;
  padding: 1em;
}

.bottom {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-left: auto;
    padding-right: auto;
}


:global(body) {
  background-color: var(--light-bg);
  color: var(--light-color); /* Default light color */
  transition: color 1s, background-color 1s;
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
}

:global(.dark-mode) .switch {
  background-color: var(--dark-code);
}


textarea {
  width: 100%;
  max-width: 400px;
  min-width: 250px;
  height: auto;
  padding: 10px;
  font-size: 16px;
  border: 2px solid var(--light-color);
  border-radius: 8px;
  background-color: var(--light-bg);
  color: var(--light-color);
  transition: all 0.3s ease-in-out;
  resize: vertical; /* Allows resizing only vertically */
}

textarea::placeholder {
  color: rgba(0, 0, 0, 0.5);
}

:global(.dark-mode) textarea {
  background-color: var(--dark-bg);
  color: var(--dark-color);
  border: 2px solid var(--dark-color);
}


.popup {
    background: #1a1a1a;
    color: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    width: 300px;
    box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.3);
}

.popup button {
    margin-top: 15px;
    padding: 8px 16px;
    background: #ff4444;
    border: none;
    color: white;
    border-radius: 5px;
    cursor: pointer;
}
</style>
