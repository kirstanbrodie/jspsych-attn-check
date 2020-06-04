/**
 * jspsych-attn-check
 * a jspsych plugin for conducting an attention check using the Levenshtein distance between two strings 
 *
 * Kirstan Brodie
 *
 * jsPsych written by Joshua R. de Leeuw (https://github.com/jspsych)
 * Levenshtein distance function written by Andrei Mackenzie (https://gist.github.com/andrei-m/982927)
 *
 *
 */


jsPsych.plugins['attn-check'] = (function() {

  var plugin = {};

  jsPsych.pluginAPI.registerPreload('attn-check', 'stimulus', 'image');

  plugin.info = {
    name: 'attn-check',
    description: 'Display an image and a text box, then compare text box response to a string of your choice and get the Levenshtein distance between the two; specify a threshold of percentage correct required for approval.',
    parameters: {
      stimulus: {
        type: jsPsych.plugins.parameterType.IMAGE,
        pretty_name: 'Stimulus',
        default: undefined,
        description: 'The image to be displayed'
      },
      stimulus_height: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Image height',
        default: null,
        description: 'Set the image height in pixels'
      },
      stimulus_width: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Image width',
        default: null,
        description: 'Set the image width in pixels'
      },
      maintain_aspect_ratio: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Maintain aspect ratio',
        default: true,
        description: 'Maintain the aspect ratio after setting width or height'
      },
      preamble: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Preamble',
        default: null,
        description: 'Any content here will display at the top of the page above the image.'
      },
      rows: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Rows',
        default: 5,
        description: 'The number of rows for the response text box.'
      },
      columns: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Columns',
        default: 40,
        description: 'The number of columns for the response text box.'
      },
      required: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Required',
        default: true,
        description: 'Require a response'
      },
      button_label: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Button label',
        default:  'Continue',
        description: 'The text that appears on the button to finish the trial.'
      },
      compare_to: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Compare to',
        default: 'Comparison text',
        description: 'The text string that the participant response is compared to.'
      },
      threshold: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Threshold',
        default: 90,
        description: 'The threshold for the Levenshtein distance required to pass approval for the attention check - indicate the minimum percentage correct required for approval.'
      }
    }
  }

  plugin.trial = function(display_element, trial) {

   
    if (typeof trial.rows == 'undefined') {
      trial.rows = 5;
    }
  
    if (typeof trial.columns == 'undefined') {
      trial.columns = 40;
    }

    var html = '';

    // add prompt text
    if(trial.preamble !== null){
      html += '<div id="jspsych-survey-text-preamble" class="jspsych-survey-text-preamble">'+trial.preamble+'</div>';
    }

    // add stimulus and specify size if necessary 
    html += '<img src="'+trial.stimulus+'" id="jspsych-image-keyboard-response-stimulus" style="';

    if(trial.stimulus_height !== null){
      html += 'height:'+trial.stimulus_height+'px; '
      if(trial.stimulus_width == null && trial.maintain_aspect_ratio){
        html += 'width: auto; ';
      }
    }
    if(trial.stimulus_width !== null){
      html += 'width:'+trial.stimulus_width+'px; '
      if(trial.stimulus_height == null && trial.maintain_aspect_ratio){
        html += 'height: auto; ';
      }
    }
    html +='"></img>';

    // add form a.k.a. single text box
    html += '<form id="jspsych-survey-text-form">'

    html += '<div id="jspsych-survey-text-'+0+'" class="jspsych-survey-text-question" style="margin: 2em 0em;">';

    
    var autofocus = 0 == 0 ? "autofocus" : "";

    if(trial.rows == 1){
      html += '<input type="text" name="#jspsych-survey-text-response-' + 0 + '" size="'+trial.columns+'" '+autofocus+'></input>';
    } else {
      html += '<textarea name="#jspsych-survey-text-response-' + 0 + '" cols="' + trial.columns + '" rows="' + trial.rows + '" '+autofocus+'></textarea>';
    }
    html += '</div>';

    // add submit button
    html += '<input type="submit" id="jspsych-survey-text-next" class="jspsych-btn jspsych-survey-text" value="'+trial.button_label+'"></input>';

    html += '</form>';

    //display all trial contents
    display_element.innerHTML = html;


    display_element.querySelector('#jspsych-survey-text-form').addEventListener('submit', function(e) {
      e.preventDefault();
      // measure response time
      var endTime = (new Date()).getTime();
      var response_time = endTime - startTime;

      // create object to hold response

      var question_data = {};
      var id = "Q0";
      var val = document.querySelector('#jspsych-survey-text-'+'0').querySelector('textarea, input').value;
      var obje = {};
      obje[id] = val;
      Object.assign(question_data, obje);
      

      if (trial.required == true) {
        if (val === '') {
          alert("Please follow the instructions and provide a response.");
          return
        }
      };

      // calculate levenshtein distance 
      var levenshteinDistance = function(a, b){
        if(a.length == 0) return b.length; 
        if(b.length == 0) return a.length; 

        var matrix = [];

        // increment along the first column of each row
        var i;
        for(i = 0; i <= b.length; i++){
          matrix[i] = [i];
        }

        // increment each column in the first row
        var j;
        for(j = 0; j <= a.length; j++){
          matrix[0][j] = j;
        }

        // Fill in the rest of the matrix
        for(i = 1; i <= b.length; i++){
          for(j = 1; j <= a.length; j++){
            if(b.charAt(i-1) == a.charAt(j-1)){
              matrix[i][j] = matrix[i-1][j-1];
            } else {
              matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                      Math.min(matrix[i][j-1] + 1, // insertion
                                               matrix[i-1][j] + 1)); // deletion
            }
          }
        }
        return matrix[b.length][a.length];
      };

      var distance = levenshteinDistance(val, trial.compare_to);

      var percent_correct = (((trial.compare_to.length)-distance)/trial.compare_to.length)*100;

      //compare to threshold

      if(percent_correct < trial.threshold) {
        var approved = false;
      } else {
        var approved = true;
      };
      
      // save data
      var trialdata = {
        "rt": response_time,
        "stimulus": trial.stimulus,
        "response": JSON.stringify(question_data),
        "distance": distance,
        "percent_correct": percent_correct,
        "compare_to": trial.compare_to,
        "approved": approved
      };

      display_element.innerHTML = '';


      jsPsych.finishTrial(trialdata);
      
    });

    var startTime = (new Date()).getTime();
  };

  return plugin;
})();
