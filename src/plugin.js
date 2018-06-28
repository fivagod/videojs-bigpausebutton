import videojs from 'video.js';
import {version as VERSION} from '../package.json';

const Plugin = videojs.getPlugin('plugin');

// Default options for the plugin.
const defaults = {};

/**
 * An advanced Video.js plugin. For more information on the API
 *
 * See: https://blog.videojs.com/feature-spotlight-advanced-plugins/
 */
class Bigpausebutton extends Plugin {

  /**
   * Create a Bigpausebutton plugin instance.
   *
   * @param  {Player} player
   *         A Video.js Player instance.
   *
   * @param  {Object} [options]
   *         An optional options object.
   *
   *         While not a core part of the Video.js plugin architecture, a
   *         second argument of options is a convenient way to accept inputs
   *         from your plugin's caller.
   */
  constructor(player, options) {
    // the parent class will add player under this.player
    super(player);

    var Component = videojs.getComponent('BigPlayButton');
    var videoJsBigPauseButton = videojs.extend(Component, {
      constructor: function (player, options){
        Component.call(this, player, options);
        this.addClass('vjs-big-pause-button');
        this.addClass('vjs-icon-pause');
        this.removeClass('vjs-big-play-button');
      },
      handleClick: function(){
        player.pause();
        player.removeChild('videoJsBigPauseButton');
      }
    }) 
  
    videojs.registerComponent('VideoJsBigPauseButton', videoJsBigPauseButton);

    this.options = videojs.mergeOptions(defaults, options);

    this.player.ready(() => {
      this.player.addClass('vjs-bigpausebutton');
      this.player.on('touchstart', e => {
          if(this.player.paused() || e.touches.length != 1){
            return false;
          }
          if(typeof this.player.getChild('VideoJsBigPauseButton') == 'undefined' || !this.player.getChild('VideoJsBigPauseButton')){
            this.player.addChild('videoJsBigPauseButton');
          }
        })
        this.player.on('userinactive', () => {
          this.player.removeChild('videoJsBigPauseButton'); 
        });
        this.player.on('play',() => {
          this.player.removeChild('videoJsBigPauseButton'); 
        });
    });
  }
}

// Define default values for the plugin's `state` object here.
Bigpausebutton.defaultState = {};

// Include the version number.
Bigpausebutton.VERSION = VERSION;

// Register the plugin with video.js.
videojs.registerPlugin('bigpausebutton', Bigpausebutton);

export default Bigpausebutton;
