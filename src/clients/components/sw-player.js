import { LitElement, html, css } from 'lit';

// import needed GUI components
// import '@ircam/sc-components/sc-text.js';
// import '@ircam/sc-components/sc-slider.js';
// import '@ircam/sc-components/sc-toggle.js';
// import '@ircam/sc-components/sc-bang.js';
import '@ircam/sc-components';

class SwPlayer extends LitElement {
  constructor() {
    super();
    // reference to the `player` state
    this.player = null;
    // stores the `unsubscribe` callback returned by the `state.onUpdate` methos
    // https://soundworks.dev/soundworks/client.SharedState.html#onUpdate
    this._unobserve = null;
  }

  connectedCallback() {
    super.connectedCallback();
    // update the component when a state change occurs
    this._unobserve = this.player.onUpdate(() => this.requestUpdate());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // stop reacting to state change when the element is removed from the DOM
    this._unobserve();
  }

  render() {
    // create controls for the player state
    return html`
      <h2>Player [id: ${this.player.get('id')}]</h2>
      <div>
        <div style="padding-bottom: 4px"> 
          <sc-text>Start Synth</sc-text> 
          <sc-toggle
            @change=${e => this.player.set({ startSynth: e.detail.value })} 
          ></sc-toggle> 
        </div>
        <div style="padding-bottom: 4px"> 
          <sc-text>Volume</sc-text> 
          <sc-slider
            min=0
            max=2
            value=${this.player.get('volume')}
            @input=${e => this.player.set({ volume: e.detail.value })}
          ></sc-slider> 
        </div>
        <div style="padding-bottom: 4px"> 
          <sc-text>Source Type</sc-text>
          <sc-radio
            value=${this.player.get('granularType')}
            options="${JSON.stringify(['oscillator', 'buffer'])}"
            @change=${e => this.player.set({ granularType: e.detail.value })}
          ></sc-radio>
        </div>
        <div style="padding-bottom: 4px"> 
          <sc-text>Sound File</sc-text>
          <sc-select
            value=${this.player.get('soundFile')}
            options="${JSON.stringify(['river', 'burn', 'clang'])}"
            @change=${e => this.player.set({ soundFile: e.detail.value })}
          ></sc-select>
        </div>
        <div style="padding-bottom: 4px"> 
          <sc-text>period</sc-text> 
          <sc-slider 
            min=0.005
            max=0.9
            .value=${this.player.get('period')}
            @input=${e => this.player.set({ period: e.detail.value })} 
            number-box
          ></sc-slider>
        </div>
        <div style="padding-bottom: 4px"> 
          <sc-text>Jitter (period)</sc-text>
          <sc-dial 
            min=0.002
            max=1
            .value=${this.player.get('periodJitter')}
            @input=${e => this.player.set({ periodJitter: e.detail.value })} 
          ></sc-dial> 
        </div>
        <div style="padding-bottom: 4px"> 
          <sc-text>duration</sc-text> 
          <sc-slider 
            min=0.01
            max=0.5
            .value=${this.player.get('duration')}
            @input=${e => this.player.set({ duration: e.detail.value })}  
            number-box
          ></sc-slider> 
        </div>
        <div style="padding-bottom: 4px"> 
          <sc-text>position (buffer)</sc-text> 
          <sc-slider 
            min="0"
            max="1"
            .value=${this.player.get('startPosition')}
            @input=${e => this.player.set({ startPosition: e.detail.value })}  
            number-box
          ></sc-slider> 
        </div>
        <div style="padding-bottom: 4px"> 
          <sc-text>Jitter (position)</sc-text>
          <sc-dial 
            min=0.002
            max=1
            .value=${this.player.get('positionJitter')}
            @input=${e => this.player.set({ positionJitter: e.detail.value })} 
          ></sc-dial> 
        </div>
        <div style="padding-bottom: 4px"> 
          <sc-text>Buffer Playback Rate (detune)</sc-text> 
          <sc-slider 
            min=0
            max=10
            .value=${this.player.get('playbackRate')}
            @input=${e => this.player.set({ playbackRate  : e.detail.value })}  
            number-box
          ></sc-slider> 
        </div>
        <div style="padding-bottom: 4px"> 
          <sc-text>oscFrequency</sc-text> 
          <sc-slider 
            step=1
            min=1 
            max=15000
            .value=${this.player.get('oscFreq')}
            @input=${e => this.player.set({ oscFreq: e.detail.value })} 
            number-box
          ></sc-slider> 
        </div>
        <div style="padding-bottom: 4px"> 
          <sc-text>K-rate Distortion</sc-text>
          <sc-dial 
            min=0.0
            max=400
            .value=${this.player.get('distoAmount')}
            @input=${e => this.player.set({ distoAmount: e.detail.value })} 
          ></sc-dial> 
        </div>
        <div>
          <sc-text>Change Note (VicentoRand) </sc-text> 
          <sc-bang
            @input=${e => this.player.set({changeCent: e.detail.value })}
          ></sc-bang>
        </div>
    `;
  }
}

// register the component into the custom elements registry
customElements.define('sw-player', SwPlayer); 